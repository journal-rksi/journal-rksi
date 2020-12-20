import { useContext } from 'react';

import { AxiosContext } from 'providers/AxiosProvider';

const useSheets = () => {
  const { sheets, refetchSheets } = useContext(AxiosContext);

  return { sheets, refetchSheets };
};

export default useSheets;
