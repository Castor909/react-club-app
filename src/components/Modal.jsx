import { useId } from 'react';

export default function Modal({ open = true, onClose, title, children, showClose = true }) {
  const titleId = useId();
  const bodyId = useId();

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={bodyId}
      >
        <div className="modal-header">
          <h3 className="modal-title" id={titleId}>
            {title}
          </h3>
          {showClose && (
            <button className="modal-close" onClick={onClose} type="button" aria-label="Close">
              ×
            </button>
          )}
        </div>
        <div className="modal-body" id={bodyId}>
          {children}
        </div>
      </div>
    </div>
  );
}
