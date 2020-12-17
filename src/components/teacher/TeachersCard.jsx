import React, { useMemo } from 'react';

import HomeCard from 'components/home/HomeCard';
import MutableList from 'components/common/MutableList';

import useTeachers from 'hooks/useTeachers';

import { formatRoles } from 'helpers/formatRole';

const TeachersCard = () => {
  const { teachers, refetchTeachers } = useTeachers();

  const items = useMemo(
    () =>
      teachers?.map(({ name, id, role }) => ({
        label: `${name} (${formatRoles(role).join(', ')})`,
        value: id,
      })),
    [teachers],
  );

  return (
    <HomeCard label="Преподаватели и кураторы">
      <MutableList
        items={items}
        collectionName="users"
        editModalName="EditUser"
        createModalName="CreateTeacher"
        refetch={refetchTeachers}
      />
    </HomeCard>
  );
};

export default TeachersCard;
