export default function ErrorMessage({ message = '' }) {
  if (!message) return null;
  return (
    <div style={{ border: '1px solid #f5c6cb', background: '#fff0f0', padding: 8, borderRadius: 6, color: '#721c24' }}>
      {message}
    </div>
  );
}
