export default function Modal({ children, onClose }) {
  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal__content">
        <button className="modal__close btn" onClick={onClose} aria-label="Close">Back</button>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
}
