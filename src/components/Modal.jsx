import React from 'react'

export default function Modal({ open=true, onClose, title, children, showClose = true }){
  if(!open) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e=>e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          {showClose && (
            <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
          )}
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}
