import React, { createContext } from 'react';
import useAxios from 'axios-hooks';

export const AxiosContext = createContext({});

const AxiosProvider = ({ children }) => {
  const [{ data: groups }, refetchGroups] = useAxios(`${process.env.REACT_APP_API_URL}/groups?_sort=name&_order=asc`);
  const [{ data: subjects }, refetchSubjects] = useAxios(
    `${process.env.REACT_APP_API_URL}/subjects?_sort=name&_order_asc`,
  );
  const [{ data: teachers }, refetchTeachers] = useAxios(
    `${process.env.REACT_APP_API_URL}/users?role_like=teacher&role_like=curator&_sort=name&_order=asc`,
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
      }}
    >
      {children}
    </AxiosContext.Provider>
  );
};

export default AxiosProvider;
