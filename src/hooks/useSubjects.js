import { useContext } from 'react';

import { AxiosContext } from 'providers/AxiosProvider';

const useSubjects = () => {
  const { subjects, refetchSubjects } = useContext(AxiosContext);

  return { subjects, refetchSubjects };
};

export default useSubjects;
