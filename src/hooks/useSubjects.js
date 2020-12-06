import useAxios from 'axios-hooks';

import createQuery from 'helpers/createQuery';

const useSubjects = () => {
  const [{ data }] = useAxios(createQuery('', '/subjects'));

  return data;
};

export default useSubjects;
