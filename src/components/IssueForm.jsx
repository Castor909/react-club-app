import { useState } from 'react';

export default function IssueForm({ onSubmit = () => {}, initialZone = '', initialType = '' }) {
  const [zone, setZone] = useState(initialZone);
  const [type, setType] = useState(initialType);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!zone) return setError('Please select a zone');
    if (!type) return setError('Please select an issue type');
    if (!description || description.trim().length < 5) return setError('Please provide a brief description (min 5 chars)');
    setError('');
    onSubmit({ zone, type, description: description.trim() });
    setZone('');
    setType('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ marginTop: 12 }}>
      <h4>Report an issue</h4>
      <div style={{ marginBottom: 8 }}>
        <label>
          Zone
          <select value={zone} onChange={(e) => setZone(e.target.value)} className="form-input">
            <option value="">-- select zone --</option>
            <option value="Locker room">Locker room</option>
            <option value="Gym">Gym</option>
            <option value="Pool">Pool</option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>
          Issue type
          <select value={type} onChange={(e) => setType(e.target.value)} className="form-input">
            <option value="">-- select type --</option>
            <option value="Equipment">Equipment</option>
            <option value="Facility">Facility</option>
            <option value="Furniture">Furniture</option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>
          Description
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-textarea" rows={4} />
        </label>
      </div>

      <div>{error ? <div className="error">{error}</div> : null}</div>
      <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
        <button type="submit" className="btn btn--primary">Submit report</button>
      </div>
    </form>
  );
}
