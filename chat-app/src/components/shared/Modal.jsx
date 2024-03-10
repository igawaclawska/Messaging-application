import "./Modal.css";

const Modal = ({ children, setIsOpen }) => {
  return (
    <dialog onClick={() => setIsOpen(false)} className="modal-bg">
      <div
        onClick={(close) => close.stopPropagation()}
        className="modal-wrapper"
      >
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
