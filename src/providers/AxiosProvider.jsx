import React, { createContext } from 'react';
import useAxios from 'axios-hooks';

import useUser from 'hooks/useUser';

export const AxiosContext = createContext({});

const AxiosProvider = ({ children }) => {
  const { me } = useUser();

  const [{ data: groups }, refetchGroups] = useAxios(`${process.env.REACT_APP_API_URL}/groups?_sort=name&_order=asc`);
  const [{ data: subjects }, refetchSubjects] = useAxios(
    `${process.env.REACT_APP_API_URL}/subjects?_sort=name&_order_asc`,
  );
  const [{ data: teachers }, refetchTeachers] = useAxios(
    `${process.env.REACT_APP_API_URL}/users?role_like=teacher&role_like=curator&_sort=name&_order=asc`,
  );
  const [{ data: students }, refetchStudents] = useAxios(
    `${process.env.REACT_APP_API_URL}/users?role_like=student&_sort=name&_order=asc`,
  );
  const [{ data: sheets }, refetchSheets] = useAxios(
    `${process.env.REACT_APP_API_URL}/sheets?_sort=date&_order=desc${
      !me?.role?.includes('admin') ? `&teacher=${me?.id}` : ''
    }`,
  );

  return (
    <AxiosContext.Provider
      value={{
        groups,
        refetchGroups,
        subjects,
        refetchSubjects,
        teachers,
        refetchTeachers,
        students,
        refetchStudents,
        sheets,
        refetchSheets,
      }}
    >
      {children}
    </AxiosContext.Provider>
  );
};

export default AxiosProvider;
