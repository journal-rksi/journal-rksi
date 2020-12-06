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
const markValues = [null, 2, 3, 4, 5];

const randomName = () =>
  `${names[Math.round(Math.random() * (names.length - 1))]} ${
    lastNames[Math.round(Math.random() * (lastNames.length - 1))]
  }`;
const genId = prefix => `${prefix}_${Math.random().toString(36).substr(2, 9)}`;

const subjects = subjectNames.map(name => ({
  id: genId('sb'),
  name,
}));
const students = [];
const groups = [];
const marks = [];

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

  for (let i = 0; i < population; i++) {
    students.push({
      id: genId('st'),
      name: randomName(),
      group: groupId,
    });
  }
});

students.forEach(student => {
  const groupsSubjects = groups.find(({ id }) => student.group === id).subjects;

  groupsSubjects.forEach(subj => {
    for (let month = 12; month <= 12; month++) {
      for (let tries = 0; tries <= 5; tries++) {
        const day = Math.ceil(Math.random() * 31);
        const date = new Date(`${`0${month}`.slice(-2)}/${`0${day}`.slice(-2)}/2020`).toISOString();

        marks.push({
          date,
          mark: markValues[Math.round(Math.random() * (markValues.length - 1))],
          student: student.id,
          subject: groupsSubjects[Math.round(Math.random() * (groupsSubjects.length - 1))],
        });
      }
    }
  });
});

const db = {
  students,
  groups,
  subjects,
  marks,
};

try {
  fs.writeFileSync('./db.json', JSON.stringify(db));
} catch (err) {
  console.log('ERROR:', err);
}
