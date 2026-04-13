export default function ClassCard({ classItem, onBook = () => {} }) {
  if (!classItem) return null;

  const { name, time, level, status } = classItem;

  return (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ flex: 1 }}>
        <strong>{name}</strong> <span>— {time}</span>
        <div className="muted" style={{ fontSize: 12 }}>{level}</div>
      </div>
      <div>
        {status === 'available' || status === 'booked' ? (
          <>
            <button className={`btn ${status === 'booked' ? '' : 'btn--primary'}`} onClick={() => onBook(classItem)} disabled={status === 'booked'}>
              {status === 'booked' ? 'Booked' : 'Book'}
            </button>
          </>
        ) : (
          <button className="btn" disabled>Full</button>
        )}
      </div>
    </div>
  );
}
