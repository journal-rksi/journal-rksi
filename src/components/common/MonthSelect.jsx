import React from 'react';

import Select from 'components/common/Select';

const options = [
  {
    label: 'Январь',
    value: '0',
  },
  {
    label: 'Февраль',
    value: '1',
  },
  {
    label: 'Март',
    value: '2',
  },
  {
    label: 'Апрель',
    value: '3',
  },
  {
    label: 'Май',
    value: '4',
  },
  {
    label: 'Июнь',
    value: '5',
  },
  {
    label: 'Июль',
    value: '6',
  },
  {
    label: 'Август',
    value: '7',
  },
  {
    label: 'Сентябрь',
    value: '8',
  },
  {
    label: 'Октябрь',
    value: '9',
  },
  {
    label: 'Ноябрь',
    value: '10',
  },
  {
    label: 'Декабрь',
    value: '11',
  },
];

const MonthSelect = props => <Select options={options} label="Месяц" {...props} />;

export default MonthSelect;
