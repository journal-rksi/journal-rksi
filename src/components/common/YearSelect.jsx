import React from 'react';

import Select from 'components/common/Select';

const options = [];

for (let i = 0; i < 10; i++) {
  options.push({
    label: (new Date().getFullYear() - i).toString(),
    value: (new Date().getFullYear() - i).toString(),
  });
}

const YearSelect = props => <Select options={options} label="Год" {...props} />;

export default YearSelect;
