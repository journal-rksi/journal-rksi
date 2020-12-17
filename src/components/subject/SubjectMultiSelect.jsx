import React, { useMemo } from 'react';

import MultiSelect from 'components/common/MultiSelect';

import useSubjects from 'hooks/useSubjects';

const SubjectMultiSelect = ({ name, value, onChange, limit }) => {
  const { subjects } = useSubjects();

  const options = useMemo(() => subjects.map(({ id, name }) => ({ label: name, value: id })), [subjects]);

  return <MultiSelect limit={limit} name={name} options={options} label="Предметы" onChange={onChange} value={value} />;
};

export default SubjectMultiSelect;
