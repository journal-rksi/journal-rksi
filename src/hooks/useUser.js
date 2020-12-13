import { useHistory } from 'react-router-dom';

import axios from 'axios';
import queryString from 'query-string';

import createQuery from 'helpers/createQuery';

const useUser = () => {
  const { push } = useHistory();

  const me = () => {
    if (!localStorage?.getItem('token')) {
      return push('/login');
    }

    const [id, password] = localStorage.getItem('token').split('::');

    return new Promise(resolve => {
      axios(createQuery(queryString.stringify({ id, password }), '/users')).then(({ data }) => {
        const user = data?.[0];

        if (!user) push('/login');
        resolve(user);
      });
    });
  };

  const login = ({ login, password }) => {
    axios(createQuery(queryString.stringify({ login, password }), '/users')).then(({ data }) => {
      const user = data?.[0];

      console.log(data);

      if (user) {
        const { id, password } = user;

        localStorage.setItem('token', `${id}::${password}`);

        push('/');
      } else {
        alert('Неверный логин или пароль');
      }
    });
  };

  return {
    login,
    me,
  };
};

export default useUser;
