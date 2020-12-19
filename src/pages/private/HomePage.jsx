import React, { Fragment, useCallback } from 'react';

import SubjectsCard from 'components/subject/SubjectsCard';
import TeachersCard from 'components/teacher/TeachersCard';
import GroupsCard from 'components/group/GroupsCard';
import JournalCard from 'components/journal/JournalCard';
import AbsenceCard from 'components/home/AbsenceCard';
import StudentsCard from 'components/student/StudentsCard';

import CreateSubject from 'components/subject/CreateSubject';
import CreateGroup from 'components/group/CreateGroup';
import CreateTeacher from 'components/teacher/CreateTeacher';
import CreateStudent from 'components/student/CreateStudent';

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
          <StudentsCard />
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
      <CreateStudent />
      <CreateGroup />
    </div>
  );
};

export default HomePage;
