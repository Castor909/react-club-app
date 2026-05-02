import { useState } from 'react';

export default function VenueNotesList({ notes = [], onDeleteNote = () => {}, deletingNoteId = null, error = '' }) {
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  if (!notes || notes.length === 0) {
    return <p className="muted">No notes available.</p>;
  }

  return (
    <div>
      <h4>Venue Notes</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {notes.map((note) => (
          <li key={note.id} style={{ marginBottom: 12 }}>
            <div className="card" style={{ padding: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <p>{note.text}</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {confirmDeleteId === note.id ? (
                    <>
                      <button
                        className="btn btn--danger"
                        onClick={() => {
                          onDeleteNote(note.id);
                          setConfirmDeleteId(null);
                        }}
                        disabled={deletingNoteId === note.id}
                        style={{ fontSize: 12, padding: '6px 10px' }}
                      >
                        {deletingNoteId === note.id ? 'Deleting...' : 'Confirm'}
                      </button>
                      <button
                        className="btn btn--outline"
                        onClick={() => setConfirmDeleteId(null)}
                        disabled={deletingNoteId === note.id}
                        style={{ fontSize: 12, padding: '6px 10px' }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn--outline"
                      onClick={() => setConfirmDeleteId(note.id)}
                      disabled={deletingNoteId !== null}
                      style={{ fontSize: 12, padding: '6px 10px' }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
              {confirmDeleteId === note.id && (
                <p style={{ marginTop: 8, fontSize: 12, color: '#ff6b6b' }}>
                  Are you sure you want to delete this note?
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
      {error ? <div className="error" style={{ marginTop: 12 }}>{error}</div> : null}
    </div>
  );
}
