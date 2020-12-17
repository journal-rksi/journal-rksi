import React, { useMemo } from 'react';

import HomeCard from 'components/home/HomeCard';
import MutableList from 'components/common/MutableList';

import useGroups from 'hooks/useGroups';
import useTeachers from 'hooks/useTeachers';

const GroupsCard = () => {
  const { groups, refetchGroups } = useGroups();
  const { teachers } = useTeachers();

  const items = useMemo(
    () =>
      groups?.map(({ name, id, curator }) => {
        const curatorName = teachers?.find(({ id }) => id === curator)?.name;

        const label = `${name} ${curatorName ? `(${curatorName})` : ''}`;
        return { label, value: id };
      }),
    [groups, teachers],
  );

  return (
    <HomeCard label="Группы">
      <MutableList
        items={items}
        collectionName="groups"
        editModalName="EditGroup"
        createModalName="CreateGroup"
        refetch={refetchGroups}
      />
    </HomeCard>
  );
};

export default GroupsCard;
