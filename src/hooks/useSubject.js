import axios from 'axios';

import queryString from 'query-string';

import createQuery from 'helpers/createQuery';

const useSubject = async ({ groupId, subjectId, date }) => {
  const inputDate = new Date(date);

  const { data: subject = {} } = await axios.get(createQuery(queryString.stringify({ id: subjectId }), '/subjects'));

  const { data: group = {} } = await axios.get(createQuery(queryString.stringify({ id: groupId }), '/groups'));

  const { data: students = [] } = await axios.get(
    createQuery(queryString.stringify({ group: groupId, role_like: 'student' }), '/users'),
  );

  const { data: marks = [] } = await axios.get(
    createQuery(
      queryString.stringify({
        student: students?.map(({ id }) => id),
        subject: subjectId,
        date_lte: new Date(inputDate.getFullYear(), inputDate.getMonth()),
      }),
      '/marks',
    ),
  );

  return {
    subject,
    students,
    marks,
    group,
  };
};

export default useSubject;
