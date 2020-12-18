import React, { useMemo } from 'react';

import HomeCard from 'components/home/HomeCard';
import MutableList from 'components/common/MutableList';

import useSubjects from 'hooks/useSubjects';
import useModal from 'hooks/useModal';

const SubjectsCard = () => {
  const { open } = useModal('CreateSubject');

  const { subjects, refetchSubjects } = useSubjects();

  const items = useMemo(() => subjects?.map(({ id, name }) => ({ label: name, value: id }), [subjects]));

  const handleEdit = id => open({ id, label: 'Редактировать предмет' });
  const handleAdd = () => open({ label: 'Добавить предмет' });

  return (
    <HomeCard label="Предметы">
      <MutableList
        items={items}
        collectionName="subjects"
        createModalName="CreateSubject"
        refetch={refetchSubjects}
        onEdit={handleEdit}
        onAdd={handleAdd}
      />
    </HomeCard>
  );
};

export default SubjectsCard;
