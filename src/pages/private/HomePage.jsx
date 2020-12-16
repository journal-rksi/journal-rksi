import React, { Fragment, useCallback } from 'react';

import SubjectsCard from 'components/home/SubjectsCard';
import TeachersCard from 'components/home/TeachersCard';
import GroupsCard from 'components/group/GroupsCard';
import JournalCard from 'components/journal/JournalCard';
import AbsenceCard from 'components/home/AbsenceCard';

import useUser from 'hooks/useUser';

import { RolesEnum } from 'helpers/constants';

const HomePage = () => {
  const { me } = useUser();
  const role = me?.role;

  const CardsToShow = useCallback(() => {
    if (role?.includes(RolesEnum.Admin)) {
      return (
        <Fragment>
          <SubjectsCard />
          <TeachersCard />
          <GroupsCard />
        </Fragment>
      );
    }

    return null;
  }, [role]);

  return (
    <div className="page home">
      <CardsToShow />
      <JournalCard />
      <AbsenceCard />
    </div>
  );
};

export default HomePage;
