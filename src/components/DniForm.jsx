import { useState } from 'react';

export default function DniForm({ title = 'Enter DNI', onSubmit = () => {}, onBack = () => {}, error = '' }) {
  const [dni, setDni] = useState('');
  const [localError, setLocalError] = useState('');

  const validate = (value) => {
    if (!value || value.trim() === '') return 'DNI is required';
    // Example DNI format: A1234567B (letter + 7 digits + letter)
    const re = /^[A-Za-z]\d{7}[A-Za-z]$/;
    if (!re.test(value)) return 'DNI format is invalid';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate(dni);
    setLocalError(v);
    if (!v) onSubmit(dni);
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6 }}>
      <h4>{title}</h4>
      <div style={{ marginBottom: 8 }}>
        <input
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          placeholder="A1234567B"
          style={{ padding: 8, width: '100%' }}
        />
      </div>
      <div style={{ color: 'red', minHeight: 18 }}>{localError || error}</div>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button type="submit">Continue</button>
        <button type="button" onClick={onBack}>Back</button>
      </div>
    </form>
  );
}
