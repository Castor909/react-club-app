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
    <form onSubmit={handleSubmit} className="card">
      <h4>{title}</h4>
      <div style={{ marginBottom: 8 }}>
        <input
          className="form-input"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          placeholder="A1234567B"
        />
      </div>
      <div style={{ minHeight: 18 }}>{localError || error ? <div className="error">{localError || error}</div> : null}</div>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button type="submit" className="btn btn--primary">Continue</button>
        <button type="button" className="btn" onClick={onBack}>Back</button>
      </div>
    </form>
  );
}
