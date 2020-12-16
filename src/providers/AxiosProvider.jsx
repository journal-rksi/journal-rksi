import React, { createContext } from 'react';
import useAxios from 'axios-hooks';

export const AxiosContext = createContext({});

const AxiosProvider = ({ children }) => {
  const [{ data: groups }, refetchGroups] = useAxios(`${process.env.REACT_APP_API_URL}/groups`);
  const [{ data: subjects }, refetchSubjects] = useAxios(`${process.env.REACT_APP_API_URL}/subjects`);

  return (
    <AxiosContext.Provider
      value={{
        groups,
        refetchGroups,
        subjects,
        refetchSubjects,
      }}
    >
      {children}
    </AxiosContext.Provider>
  );
};

export default AxiosProvider;
