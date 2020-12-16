import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';

import useModal from 'hooks/useModal';

const Modal = ({ name, center, label, className, children }) => {
  const { activeModal, close } = useModal(name);

  const handleClick = e => {
    const { classList } = e.target;

    if (classList.contains('modal')) return close();
  };

  const handleKeyDown = ({ key }) => {
    if (key === 'Escape') return close();
  };

  useEffect(() => {
    const clickEvent = document.addEventListener('mousedown', handleClick);
    const keyDownEvent = document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', clickEvent);
      document.removeEventListener('mousedown', keyDownEvent);
    };
  }, []);

  if (activeModal !== name) return null;

  return (
    <div className={classnames('modal', { center: Boolean(center) })}>
      <div className={classnames('modal-content', className)}>
        <div className="modal-header">
          <h6 className="modal-label">{label}</h6>
          <button onClick={close} className="modal-close">
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const ModalContainer = props => createPortal(<Modal {...props}>{props.children}</Modal>, document.body);

export default ModalContainer;
