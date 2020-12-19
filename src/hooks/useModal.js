import { useContext } from 'react';

import { ModalContext } from 'providers/ModalProvider';

const useModal = modalName => {
  const { activeModal, openModal = () => null, closeModal = () => null, context, setContext } = useContext(
    ModalContext,
  );

  const open = (openContext = null) => {
    openModal(modalName);
    setContext(openContext);
  };

  const close = () => {
    closeModal(modalName);
    setContext(null);
  };

  return {
    activeModal,
    open,
    close,
    context: context || {},
    setContext,
  };
};

export default useModal;
