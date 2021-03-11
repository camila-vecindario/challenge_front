const Modal = ({ visible = false, onClose, children }) => {
  return (
    <div className={`modal ${visible ? 'is-active' : ''}`}>
      <div className='modal-background' onClick={onClose}></div>
      <div className='modal-content'>{children}</div>
    </div>
  );
};

export default Modal;
