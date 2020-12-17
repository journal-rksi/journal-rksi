import React from 'react';

import HomeCard from 'components/home/HomeCard';
import Form from 'components/common/Form';
import GroupSelect from 'components/group/GroupSelect';
import MonthSelect from 'components/common/MonthSelect';
import YearSelect from 'components/common/YearSelect';

const fields = [
  {
    name: 'group',
    component: <GroupSelect />,
  },
  {
    name: 'month',
    component: <MonthSelect />,
  },
  {
    name: 'year',
    component: <YearSelect />,
  },
];

const AbsenceCard = () => {
  return (
    <HomeCard label="Пропуски">
      <Form fields={fields} onSubmit={console.log} />
    </HomeCard>
  );
};

export default AbsenceCard;
