import { useContext } from 'react';

import { AxiosContext } from 'providers/AxiosProvider';

const useTeachers = () => {
  const { teachers, refetchTeachers } = useContext(AxiosContext);

  return { teachers, refetchTeachers };
};

export default useTeachers;
