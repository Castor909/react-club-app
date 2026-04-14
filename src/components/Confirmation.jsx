export default function Confirmation({ message = '', onBack = () => {} }) {
  if (!message) return null;
  return (
    <div className="confirm">
      <div className="emoji">✅</div>
      <div className="message">{message}</div>
      <div className="confirm-actions" style={{ marginTop: 8 }}>
        <button className="btn btn--primary full-width" onClick={onBack}>Back</button>
      </div>
    </div>
  );
}
