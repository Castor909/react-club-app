export default function Confirmation({ message = '', onBack = () => {} }) {
  if (!message) return null;
  return (
    <div className="confirm" aria-live="polite" aria-atomic="true">
      <div className="emoji">✅</div>
      <div className="message">{message}</div>
      <div className="confirm-actions" style={{ marginTop: 8 }}>
        <button className="btn btn--primary full-width" onClick={onBack} type="button">
          Back
        </button>
      </div>
    </div>
  );
}
