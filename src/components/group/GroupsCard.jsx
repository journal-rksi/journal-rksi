import React, { useMemo } from 'react';

import HomeCard from 'components/home/HomeCard';
import MutableList from 'components/common/MutableList';

import useModal from 'hooks/useModal';
import useGroups from 'hooks/useGroups';
import useTeachers from 'hooks/useTeachers';

const GroupsCard = () => {
  const { open } = useModal('CreateGroup');
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

  const handleEdit = id => open({ id, label: 'Редактировать группу' });
  const handleAdd = () => open({ label: 'Добавить группу' });

  return (
    <HomeCard label="Группы">
      <MutableList
        items={items}
        collectionName="groups"
        refetch={refetchGroups}
        onEdit={handleEdit}
        onAdd={handleAdd}
      />
    </HomeCard>
  );
};

export default GroupsCard;
