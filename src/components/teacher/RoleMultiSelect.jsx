import React from 'react';

import MultiSelect from 'components/common/MultiSelect';

import formatRole from 'helpers/formatRole';

const options = [
  {
    label: formatRole('teacher'),
    value: 'teacher',
  },
  {
    label: formatRole('curator'),
    value: 'curator',
  },
];

const RoleMultiSelect = ({ name, value, onChange, limit }) => (
  <MultiSelect name={name} options={options} limit={limit} label="Роль" onChange={onChange} value={value} />
);

export default RoleMultiSelect;
