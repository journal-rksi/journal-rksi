import useAxios from 'axios-hooks';

const useGroups = () => {
  const [{ data }] = useAxios(`${process.env.REACT_APP_API_URL}/groups`);

  return data;
};

export default useGroups;
