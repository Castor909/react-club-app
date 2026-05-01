import { useState } from 'react';

export default function IssueForm({
  onSubmit = () => {},
  initialZone = '',
  initialType = '',
  isSubmitting = false,
  submitLabel = 'Submit report',
}) {
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

    const submission = onSubmit({ zone, type, description: description.trim() });
    const resetFields = () => {
      setZone('');
      setType('');
      setDescription('');
    };

    if (submission && typeof submission.then === 'function') {
      submission.then(resetFields).catch(() => {});
      return;
    }

    resetFields();
  };

  return (
    <form onSubmit={handleSubmit} className="card modal-form">
      <h4>Report an issue</h4>
      <div style={{ marginBottom: 12 }}>
        <label>
          Zone
          <select
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="form-input full-width"
            disabled={isSubmitting}
          >
            <option value="">-- select zone --</option>
            <option value="Locker room">Locker room</option>
            <option value="Gym">Gym</option>
            <option value="Pool">Pool</option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>
          Issue type
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="form-input full-width"
            disabled={isSubmitting}
          >
            <option value="">-- select type --</option>
            <option value="Equipment">Equipment</option>
            <option value="Facility">Facility</option>
            <option value="Furniture">Furniture</option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea full-width"
            rows={4}
            disabled={isSubmitting}
          />
        </label>
      </div>

      <div>{error ? <div className="error">{error}</div> : null}</div>
      <div style={{ marginTop: 12 }}>
        <button type="submit" className="btn btn--primary full-width" disabled={isSubmitting}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
