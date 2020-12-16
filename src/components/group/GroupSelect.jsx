import React, { Fragment, useMemo } from 'react';

import Select from 'components/common/Select';
import CreateGroup from 'components/group/CreateGroup';

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
    <Fragment>
      <Select options={options} label="Дисциплина" addLabel="Добавить дисциплину" onAdd={open} {...props} />
      <CreateGroup />
    </Fragment>
  );
};

export default GroupSelect;
