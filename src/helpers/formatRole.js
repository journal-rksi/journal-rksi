const rolesDictionary = {
  student: 'Студент',
  teacher: 'Преподаватель',
  curator: 'Куратор',
  admin: 'Администратор',
};

const formatRole = role => rolesDictionary[role];

export const formatRoles = roles => roles.map(role => formatRole(role));

export default formatRole;
