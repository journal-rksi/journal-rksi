import { useContext } from 'react';

import { AxiosContext } from 'providers/AxiosProvider';

const useStudents = () => {
  const { students, refetchStudents } = useContext(AxiosContext);

  return { students, refetchStudents };
};

export default useStudents;
