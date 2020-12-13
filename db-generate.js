const fs = require('fs');

const subjectNames = [
  'Физкультура',
  'ПОПД',
  'Иностранный Язык',
  'Веб-разработка',
  '.NET',
  'JavaScript',
  'Экономика',
  'ОПД',
  'Физика',
  'Математика',
  'Литература',
  'Русский язык',
  'Химия',
  'Робототехника',
  'Обществознание',
];
const names = [
  'Иван',
  'Максим',
  'Руслан',
  'Артур',
  'Евгений',
  'Ирина',
  'Анастасия',
  'Евгения',
  'Маргарита',
  'Анжелика',
  'Елизавета',
  'Михаил',
  'Марк',
  'Артем',
  'Дмитрий',
  'Ксения',
  'Тимофей',
  'Георгий',
  'Вячеслав',
  'Ярослав',
  'Станислав',
  'Мария',
  'Марина',
  'Муслан',
  'Аслан',
  'Арслан',
  'Ибрагим',
];
const lastNames = [
  'Сальников',
  'Плотников',
  'Башарин',
  'Какурин',
  'Перегудов',
  'Казеев',
  'Ракаев',
  'Джакаев',
  'Жакаев',
  'Немакаев',
  'Магкаев',
  'Какаев',
  'Муцураев',
  'Масяев',
  'Масенюк',
  'Сагидов',
  'Пилипенко',
  'Коркунов',
  'Рыбачек',
  'Гречка',
  'Гордеев',
  'Храмов',
  'Даненко',
];
const groupNames = ['ПОКС', 'ИБ', 'ИБТ', 'ИБА', 'МТ', 'КС'];

const randomName = () =>
  `${names[Math.round(Math.random() * (names.length - 1))]} ${
    lastNames[Math.round(Math.random() * (lastNames.length - 1))]
  }`;
const genId = prefix => `${prefix}_${Math.random().toString(36).substr(2, 9)}`;

const subjects = subjectNames.map(name => ({
  id: genId('sb'),
  name,
}));
const groups = [];
const marks = [];
const students = [];
const teachers = [];

groupNames.forEach(name => {
  for (let i = 1; i <= 4; i++) {
    for (let k = 1; k <= 4; k++) {
      const groupSubjects = subjects.reduce(subjs => {
        const unTaken = subjects.map(({ id }) => id).filter(id => !subjs.includes(id));

        return subjs.length >= 10 ? subjs : [...subjs, unTaken[Math.round(Math.random() * (unTaken.length - 1))]];
      }, []);
      groups.push({
        id: genId('gr'),
        name: `${name}-${i}${k}`,
        subjects: groupSubjects,
      });
    }
  }
});

groups.forEach(({ id: groupId }) => {
  const population = Math.random() * 10 + 20;

  teachers.push(
    (() => {
      const id = genId('tc');

      return {
        id,
        role: ['teacher'],
        name: randomName(),
        login: id,
        password: 'pswd_dev',
        subject: subjects[Math.ceil(Math.random() * subjects.length - 1)].id,
        relations: {
          groups: [groupId],
        },
      };
    })(),
  );

  for (let i = 0; i < population; i++) {
    students.push({
      id: genId('st'),
      role: ['student'],
      name: randomName(),
      relations: {
        groups: [groupId],
      },
    });
  }
});

const db = {
  users: [...students, ...teachers],
  groups,
  subjects,
  marks,
};

try {
  fs.writeFileSync('./db.json', JSON.stringify(db));
} catch (err) {
  console.log('ERROR:', err);
}
