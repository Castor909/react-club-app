export default function ErrorMessage({ message = '', onRetry }) {
  if (!message) return null;

  return (
    <div className="error">
      <p>{message}</p>
      {onRetry ? (
        <button className="btn" onClick={onRetry} type="button">
          Retry
        </button>
      ) : null}
    </div>
  );
}
