import React, { Fragment, useCallback, useMemo } from 'react';

import SubjectsCard from 'components/subject/SubjectsCard';
import TeachersCard from 'components/teacher/TeachersCard';
import GroupsCard from 'components/group/GroupsCard';
import JournalCard from 'components/sheet/JournalCard';
import AbsenceCard from 'components/home/AbsenceCard';
import StudentsCard from 'components/student/StudentsCard';
import SheetsCard from 'components/sheet/SheetsCard';

import CreateSubject from 'components/subject/CreateSubject';
import CreateGroup from 'components/group/CreateGroup';
import CreateTeacher from 'components/teacher/CreateTeacher';
import CreateStudent from 'components/student/CreateStudent';
import CreateSheet from 'components/sheet/CreateSheet';

import useUser from 'hooks/useUser';

import { RolesEnum } from 'helpers/constants';

const HomePage = () => {
  const { me } = useUser();

  const role = useMemo(() => me?.role, [me]);

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

    if (role?.includes(RolesEnum.Curator)) {
      if (role?.includes(RolesEnum.Teacher)) {
        return (
          <Fragment>
            <SheetsCard />
            <StudentsCard />
            <GroupsCard />
          </Fragment>
        );
      }

      return (
        <Fragment>
          <StudentsCard />
          <GroupsCard />
        </Fragment>
      );
    }

    if (role?.includes(RolesEnum.Teacher)) {
      return (
        <Fragment>
          <SheetsCard />
          <StudentsCard />
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
      <CreateStudent />
      <CreateGroup />
      <CreateSheet />
    </div>
  );
};

export default HomePage;
