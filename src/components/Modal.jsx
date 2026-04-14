import React from 'react'

export default function Modal({open, onClose, title, children, showClose=true}){
  if(!open) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e=>e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        {title && <h3>{title}</h3>}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}
import React from 'react';

export default function Modal({ children, onClose }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-content">
        <button className="modal-close btn" onClick={onClose} aria-label="Close">×</button>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
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
