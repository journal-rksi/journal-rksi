import React, { useState } from 'react';

import useUser from 'hooks/useUser';

const LoginPage = () => {
  const { login } = useUser();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = e => {
    const { value, name } = e.target;

    switch (name) {
      case 'username':
        return setUsername(value);
      case 'password':
        return setPassword(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    return login({ login: username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Вход в систему</h4>
      <input value={username} name="username" type="text" placeholder="Логин" onChange={handleChange} />
      <input value={password} name="password" type="password" placeholder="Пароль" onChange={handleChange} />
      <button type="submit">Войти</button>
    </form>
  );
};

export default LoginPage;
