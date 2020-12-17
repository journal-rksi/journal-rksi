import React from 'react';

import HomeCard from 'components/home/HomeCard';
import Form from 'components/common/Form';
import GroupSelect from 'components/group/GroupSelect';
import SubjectSelect from 'components/subject/SubjectSelect';
import MonthSelect from 'components/common/MonthSelect';
import YearSelect from 'components/common/YearSelect';

const fields = [
  {
    name: 'group',
    component: <GroupSelect />,
  },
  {
    name: 'subject',
    component: <SubjectSelect />,
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

const JournalCard = () => {
  return (
    <HomeCard label="Оценки">
      <Form fields={fields} onSubmit={console.log} />
    </HomeCard>
  );
};

export default JournalCard;
