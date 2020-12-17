import React, { useMemo } from 'react';

import HomeCard from 'components/home/HomeCard';
import MutableList from 'components/common/MutableList';

import useSubjects from 'hooks/useSubjects';

const SubjectsCard = () => {
  const { subjects, refetchSubjects } = useSubjects();

  const items = useMemo(() => subjects?.map(({ id, name }) => ({ label: name, value: id }), [subjects]));

  return (
    <HomeCard label="Предметы">
      <MutableList
        items={items}
        collectionName="subjects"
        editModalName="EditSubject"
        createModalName="CreateSubject"
        refetch={refetchSubjects}
      />
    </HomeCard>
  );
};

export default SubjectsCard;
