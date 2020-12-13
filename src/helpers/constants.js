export const MarksEnum = {
  Absent: 0,
  Two: 1,
  Three: 2,
  Four: 3,
  Five: 4,
};

export const Marks = {
  [MarksEnum.Absent]: null,
  [MarksEnum.Two]: 2,
  [MarksEnum.Three]: 3,
  [MarksEnum.Four]: 4,
  [MarksEnum.Five]: 5,
};

export const RolesEnum = {
  Admin: 0,
  Curator: 1,
  Teacher: 2,
  Student: 3,
};

export const Roles = {
  [RolesEnum.Admin]: 'admin',
  [RolesEnum.Curator]: 'curator',
  [RolesEnum.Teacher]: 'teacher',
  [RolesEnum.Student]: 'student',
};
