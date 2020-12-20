import React from 'react';

import Select from 'components/common/Select';

const options = [
  {
    label: 'Январь',
    value: '1',
  },
  {
    label: 'Февраль',
    value: '2',
  },
  {
    label: 'Март',
    value: '3',
  },
  {
    label: 'Апрель',
    value: '4',
  },
  {
    label: 'Май',
    value: '5',
  },
  {
    label: 'Июнь',
    value: '6',
  },
  {
    label: 'Июль',
    value: '7',
  },
  {
    label: 'Август',
    value: '8',
  },
  {
    label: 'Сентябрь',
    value: '9',
  },
  {
    label: 'Октябрь',
    value: '10',
  },
  {
    label: 'Ноябрь',
    value: '11',
  },
  {
    label: 'Декабрь',
    value: '12',
  },
];

const MonthSelect = props => <Select options={options} label="Месяц" {...props} />;

export default MonthSelect;
