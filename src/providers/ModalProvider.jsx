import React, { useState, createContext } from 'react';

export const ModalContext = createContext({});

const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [context, setContext] = useState(null);

  const openModal = modalName => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  return (
    <ModalContext.Provider
      value={{
        activeModal,
        openModal,
        closeModal,
        context,
        setContext,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
