import React, { useMemo } from 'react';

import MultiSelect from 'components/common/MultiSelect';

import useGroups from 'hooks/useGroups';

const GroupMultiSelect = ({ name, value, onChange, label, limit }) => {
  const { groups } = useGroups();

  const options = useMemo(() => groups.map(({ id, name }) => ({ label: name, value: id })), [groups]);

  return <MultiSelect limit={limit} name={name} options={options} label={label} onChange={onChange} value={value} />;
};

export default GroupMultiSelect;
