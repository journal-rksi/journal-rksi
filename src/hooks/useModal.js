import { useContext } from 'react';

import { ModalContext } from 'providers/ModalProvider';

const useModal = modalName => {
  const { activeModal, openModal = () => null, closeModal = () => null } = useContext(ModalContext);

  const open = () => openModal(modalName);
  const close = () => closeModal(modalName);

  return {
    activeModal,
    open,
    close,
  };
};

export default useModal;
