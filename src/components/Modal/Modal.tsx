import React from 'react';
import {
  Alert,
  AlterOctagon,
  CloseCircle,
  Information,
} from '../../assets/icons';
import { useScreenContext } from '../../context/ScreenContext';
import { capitalize, trunc } from '../../utils/text';
import './Modal.css';

interface ModalProps {
  state: 'info' | 'warn' | 'error';
  msg: string;
}

const Modal = ({ state, msg }: ModalProps): JSX.Element => {
  const { modal } = useScreenContext();
  return (
    <div className="modal">
      <div className={`modal-inner modal--${state}`}>
        <div className="modal__header">
          <div>
            {state === 'info' && (
              <Information className="modal__header__state-icon modal__header__state-icon--info" />
            )}
            {state === 'warn' && (
              <Alert className="modal__header__state-icon modal__header__state-icon--warn" />
            )}
            {state === 'error' && (
              <AlterOctagon className="modal__header__state-icon modal__header__state-icon--error" />
            )}
            <h2
              className={`modal__header__title modal__header__title--${state}`}
            >
              {capitalize(state)}
            </h2>
          </div>
          <button onClick={modal.close}>
            <CloseCircle className="modal__header__btn-icon" />
          </button>
        </div>
        <div>
          <p>{trunc(msg, 500)}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
