import React, { useMemo } from 'react';

import Select from 'components/common/Select';

import useModal from 'hooks/useModal';
import useGroups from 'hooks/useGroups';

const GroupSelect = props => {
  const { open } = useModal('CreateGroup');

  const { groups } = useGroups();

  const options = useMemo(
    () =>
      groups?.map(({ id, name }) => ({
        label: name,
        value: id,
      })),
    [groups],
  );

  if (!options) return null;

  return (
    <Select
      options={options}
      label="Группа"
      addLabel="Добавить группу"
      onAdd={() => open({ label: 'Добавить группу' })}
      {...props}
    />
  );
};

export default GroupSelect;
