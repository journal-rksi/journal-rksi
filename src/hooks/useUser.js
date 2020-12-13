import { useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import queryString from 'query-string';

import { UserContext } from 'App';

import createQuery from 'helpers/createQuery';

const useUser = () => {
  const { me, setMe } = useContext(UserContext);

  const { push } = useHistory();

  const authorize = useCallback(async () => {
    if (!localStorage?.getItem('token')) {
      return push('/login');
    }

    const [id, password] = localStorage.getItem('token').split('::');

    return await axios(createQuery(queryString.stringify({ id, password }), '/users')).then(({ data }) => {
      const user = data?.[0];

      if (!user) push('/login');

      setMe(user);
    });
  }, []);

  const login = ({ login, password }) => {
    axios(createQuery(queryString.stringify({ login, password }), '/users')).then(({ data }) => {
      const user = data?.[0];

      console.log(data);

      if (user) {
        const { id, password } = user;

        localStorage.setItem('token', `${id}::${password}`);

        push('/');

        setMe(user);
      } else {
        alert('Неверный логин или пароль');
      }
    });
  };

  return {
    me,
    login,
    authorize,
  };
};

export default useUser;
