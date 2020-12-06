import useAxios from 'axios-hooks';

import queryString from 'query-string';

import createQuery from 'helpers/createQuery';

const useSubject = ({ groupId, subjectId, date }) => {
  const inputDate = new Date(date);

  const [{ data: subject = {}, loading: subjectLoading }] = useAxios(
    createQuery(queryString.stringify({ id: subjectId }), '/subjects'),
    {
      useCache: false,
    },
  );
  const [{ data: group = {}, loading: groupLoading }] = useAxios(
    createQuery(queryString.stringify({ id: groupId }), '/groups'),
    {
      useCache: false,
    },
  );
  const [{ data: students = [], loading: studentsLoading }] = useAxios(
    createQuery(queryString.stringify({ group: groupId }), '/students'),
    {
      useCache: false,
    },
  );
  const [{ data: marks = [], loading: marksLoading }] = useAxios(
    createQuery(
      queryString.stringify({
        student: students?.map(({ id }) => id),
        subject: subjectId,
        date_lte: new Date(inputDate.getFullYear(), inputDate.getMonth()),
      }),
      '/marks',
    ),
    {
      useCache: false,
    },
  );

  return {
    subject,
    students,
    marks,
    group,
    loading: marksLoading || studentsLoading || groupLoading || subjectLoading,
  };
};

export default useSubject;
