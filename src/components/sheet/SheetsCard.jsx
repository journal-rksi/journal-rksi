import React, { useMemo } from 'react';

import HomeCard from 'components/home/HomeCard';
import MutableList from 'components/common/MutableList';

import useSheets from 'hooks/useSheets';
import useGroups from 'hooks/useGroups';
import useSubjects from 'hooks/useSubjects';
import useModal from 'hooks/useModal';

import getMonth from 'helpers/getMonth';

const StudentsCard = () => {
  const { open } = useModal('CreateSheet');

  const { sheets, refetchSheets } = useSheets();
  const { groups } = useGroups();
  const { subjects } = useSubjects();

  const items = useMemo(
    () =>
      sheets?.map(({ id, group, date, subject }) => {
        const groupName = groups?.find(({ id: groupId }) => group === groupId)?.name;
        const subjectName = subjects?.find(({ id: subjectId }) => subject === subjectId)?.name;
        const year = date.split('-')[0];
        const month = getMonth(parseInt(date?.split('-')[1]));

        const label = [month, year, subjectName, groupName].join(' ');

        return {
          label,
          value: id,
        };
      }),
    [groups, subjects, sheets],
  );

  const handleEdit = id => open({ id, label: 'Редактировать страницу' });
  const handleAdd = () => open({ label: 'Добавить страницу' });

  return (
    <HomeCard label="Страницы журнала">
      <MutableList
        items={items}
        collectionName="sheets"
        refetch={refetchSheets}
        onEdit={handleEdit}
        onAdd={handleAdd}
      />
    </HomeCard>
  );
};

export default StudentsCard;
