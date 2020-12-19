import React, { useMemo } from 'react';

import HomeCard from 'components/home/HomeCard';
import MutableList from 'components/common/MutableList';

import useStudents from 'hooks/useStudents';
import useGroups from 'hooks/useGroups';
import useModal from 'hooks/useModal';

const getGroupsNames = (initialGroups, groupIds) => {
  const filtered = initialGroups.filter(({ id: groupId }) => {
    return groupIds?.includes(groupId);
  });
  const mapped = filtered.map(({ name }) => name);

  return mapped.join(', ');
};

const StudentsCard = () => {
  const { open } = useModal('CreateStudent');

  const { students, refetchStudents } = useStudents();
  const { groups } = useGroups();

  const items = useMemo(
    () =>
      students?.map(({ name, id, group: groupId }) => {
        const groupNames = getGroupsNames(groups, [groupId]);
        return {
          label: `${name} ${groupNames.length ? `(${groupNames})` : ''}`,
          value: id,
        };
      }),
    [students],
  );

  const handleEdit = id => open({ id, label: 'Редактировать студента' });
  const handleAdd = () => open({ label: 'Добавить студента' });

  return (
    <HomeCard label="Студенты">
      <MutableList
        items={items}
        collectionName="users"
        refetch={refetchStudents}
        onEdit={handleEdit}
        onAdd={handleAdd}
      />
    </HomeCard>
  );
};

export default StudentsCard;
