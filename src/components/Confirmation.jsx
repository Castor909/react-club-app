export default function Confirmation({ message = '', onBack = () => {} }) {
  if (!message) return null;
  return (
    <div style={{ border: '1px solid #cfc', padding: 12, borderRadius: 6, background: '#f7fff7' }}>
      <div style={{ fontSize: 20 }}>✅</div>
      <div style={{ marginTop: 8 }}>{message}</div>
      <div style={{ marginTop: 12 }}>
        <button onClick={onBack}>Back to Home Page</button>
      </div>
    </div>
  );
}
