import React from 'react'

export default function Modal({ open=true, onClose, title, children, showClose = true }){
  if(!open) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e=>e.stopPropagation()} role="dialog" aria-modal="true">
        {showClose && (
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        )}
        {title && <h3>{title}</h3>}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}
