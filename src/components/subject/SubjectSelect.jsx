import React, { useMemo } from 'react';

import Select from 'components/common/Select';

import useModal from 'hooks/useModal';
import useSubjects from 'hooks/useSubjects';

const SubjectSelect = props => {
  const { open } = useModal('CreateSubject');

  const { subjects } = useSubjects();

  const options = useMemo(
    () =>
      subjects?.map(({ id, name }) => ({
        label: name,
        value: id,
      })),
    [subjects],
  );

  if (!options) return null;

  return (
    <Select
      options={options}
      label="Дисциплина"
      addLabel="Добавить дисциплину"
      onAdd={() => open({ label: 'Добавить дисциплину' })}
      {...props}
    />
  );
};

export default SubjectSelect;
