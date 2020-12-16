import React from 'react';

import HomeCard from 'components/home/HomeCard';
import GroupsSelect from 'components/group/GroupSelect';
import Form from 'components/common/Form';

const fields = [
  {
    name: 'group',
    component: <GroupsSelect />,
    required: true,
  },
];

const GroupsCard = () => {
  return (
    <HomeCard label="Группы">
      <Form fields={fields} onSubmit={console.log} />
    </HomeCard>
  );
};

export default GroupsCard;
