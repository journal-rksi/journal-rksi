import React, { useState, createContext } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import Routes from 'Routes';

import ModalProvider from 'providers/ModalProvider';
import AxiosProvider from 'providers/AxiosProvider';

export const UserContext = createContext(null);

const App = () => {
  const [me, setMe] = useState(undefined);

  return (
    <Router>
      <UserContext.Provider value={{ me, setMe }}>
        <AxiosProvider>
          <ModalProvider>
            <Routes />
          </ModalProvider>
        </AxiosProvider>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
