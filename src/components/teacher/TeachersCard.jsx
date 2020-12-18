import React, { useMemo } from 'react';

import HomeCard from 'components/home/HomeCard';
import MutableList from 'components/common/MutableList';

import useTeachers from 'hooks/useTeachers';
import useModal from 'hooks/useModal';

import { formatRoles } from 'helpers/formatRole';

const TeachersCard = () => {
  const { open } = useModal('CreateTeacher');

  const { teachers, refetchTeachers } = useTeachers();

  const items = useMemo(
    () =>
      teachers?.map(({ name, id, role }) => ({
        label: `${name} (${formatRoles(role).join(', ')})`,
        value: id,
      })),
    [teachers],
  );

  const handleEdit = id => open({ id, label: 'Редактировать сотрудника' });
  const handleAdd = () => open({ label: 'Добавить сотрудника' });

  return (
    <HomeCard label="Преподаватели и кураторы">
      <MutableList
        items={items}
        collectionName="users"
        refetch={refetchTeachers}
        onEdit={handleEdit}
        onAdd={handleAdd}
      />
    </HomeCard>
  );
};

export default TeachersCard;
