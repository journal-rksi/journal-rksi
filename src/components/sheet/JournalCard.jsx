import React from 'react';
import { useHistory } from 'react-router-dom';

import queryString from 'query-string';

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
  const { push } = useHistory();

  const handleSubmit = value => {
    const { group, year, month, subject } = value || {};
    const date = `${year}-${month}`;

    push('/sheet?' + queryString.stringify({ group, date, subject }));
  };

  return (
    <HomeCard label="Оценки">
      <Form fields={fields} onSubmit={handleSubmit} />
    </HomeCard>
  );
};

export default JournalCard;
