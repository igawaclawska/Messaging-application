import "./Modal.css"

const Modal = ({ children, setIsOpen }) => {
  return (
    <div onClick={() => setIsOpen(false)} className="modal-bg">
      <div
        onClick={(close) => close.stopPropagation()}
        className="modal-wrapper"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
