import React, { useState, createContext } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import Routes from 'Routes';

export const UserContext = createContext({
  me: {},
  setMe: () => null,
});

const App = () => {
  const [me, setMe] = useState(undefined);

  return (
    <Router>
      <UserContext.Provider value={{ me, setMe }}>
        <Routes />
      </UserContext.Provider>
    </Router>
  );
};

export default App;
