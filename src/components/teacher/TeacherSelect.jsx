import React, { useMemo } from 'react';

import Select from 'components/common/Select';

import useTeachers from 'hooks/useTeachers';

const TeacherSelect = ({ name, value, role, label, onChange }) => {
  const { teachers } = useTeachers();

  const options = useMemo(() => {
    const filtered = teachers.filter(({ role: teacherRole }) => {
      switch (role) {
        case 'teacher':
          return teacherRole.includes('teacher');
        case 'curator':
          return teacherRole.includes('curator');
        default:
          return true;
      }
    });

    return filtered.map(({ id, name }) => ({ label: name, value: id }));
  }, [teachers]);

  return <Select label={label} options={options} value={value} name={name} onChange={onChange} />;
};

export default TeacherSelect;
