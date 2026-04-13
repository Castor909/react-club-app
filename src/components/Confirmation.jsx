export default function Confirmation({ message = '', onBack = () => {} }) {
  if (!message) return null;
  return (
    <div className="confirm">
      <div style={{ fontSize: 20 }}>✅</div>
      <div style={{ marginTop: 8 }}>{message}</div>
      <div style={{ marginTop: 12 }}>
        <button className="btn" onClick={onBack}>Back to Home Page</button>
      </div>
    </div>
  );
}
