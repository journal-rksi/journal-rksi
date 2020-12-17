import React, { Fragment, useCallback } from 'react';

import SubjectsCard from 'components/subject/SubjectsCard';
import TeachersCard from 'components/teacher/TeachersCard';
import GroupsCard from 'components/group/GroupsCard';
import JournalCard from 'components/journal/JournalCard';
import AbsenceCard from 'components/home/AbsenceCard';
import CreateSubject from 'components/subject/CreateSubject';
import CreateGroup from 'components/group/CreateGroup';
import CreateTeacher from 'components/teacher/CreateTeacher';

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
      <CreateSubject />
      <CreateTeacher />
      <CreateGroup />
    </div>
  );
};

export default HomePage;
