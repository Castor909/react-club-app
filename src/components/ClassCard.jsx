export default function ClassCard({ classItem, onBook = () => {} }) {
  if (!classItem) return null;

  const { name, time, level, status } = classItem;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ flex: 1 }}>
        <strong>{name}</strong> <span>— {time}</span>
        <div style={{ fontSize: 12, color: '#666' }}>{level}</div>
      </div>
      <div>
        {status === 'available' || status === 'booked' ? (
          <>
            <button onClick={() => onBook(classItem)} disabled={status === 'booked'}>
              {status === 'booked' ? 'Booked' : 'Book'}
            </button>
          </>
        ) : (
          <button disabled>Full</button>
        )}
      </div>
    </div>
  );
}
