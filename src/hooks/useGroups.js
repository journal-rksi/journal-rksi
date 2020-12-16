import { useContext } from 'react';

import { AxiosContext } from 'providers/AxiosProvider';

const useGroups = () => {
  const { groups, refetchGroups } = useContext(AxiosContext);

  return { groups, refetchGroups };
};

export default useGroups;
