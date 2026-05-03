import { useState } from 'react';

export default function CoachEditForm({
  coach,
  onSubmit = () => {},
  onCancel = () => {},
  error = '',
  isSubmitting = false,
}) {
  const [firstName, setFirstName] = useState(coach?.first_name || '');
  const [lastName, setLastName] = useState(coach?.last_name || '');
  const [email, setEmail] = useState(coach?.email || '');
  const [phone, setPhone] = useState(coach?.phone || '');
  const [dateOfBirth, setDateOfBirth] = useState(coach?.date_of_birth || '');
  const [addressPublicId, setAddressPublicId] = useState(coach?.address?.public_id || '');
  const [certification, setCertification] = useState(coach?.certification || '');
  const [localError, setLocalError] = useState('');

  const validate = () => {
    if (!firstName || firstName.trim() === '') return 'First name is required';
    if (!lastName || lastName.trim() === '') return 'Last name is required';
    if (!email || email.trim() === '') return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Email format is invalid';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setLocalError(v);
    if (!v) {
      // Convert the form state into the backend PATCH shape expected by sportsclub.
      onSubmit({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        date_of_birth: dateOfBirth || null,
        address_public_id: addressPublicId.trim() || null,
        certification: certification || null,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h4>Edit Coach Profile</h4>

      <div className="form-field">
        <label>
          First name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="form-input full-width"
            disabled={isSubmitting}
          />
        </label>
      </div>

      <div className="form-field">
        <label>
          Last name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="form-input full-width"
            disabled={isSubmitting}
          />
        </label>
      </div>

      <div className="form-field">
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input full-width"
            disabled={isSubmitting}
          />
        </label>
      </div>

      <div className="form-field">
        <label>
          Phone
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-input full-width"
            disabled={isSubmitting}
          />
        </label>
      </div>

      <div className="form-field">
        <label>
          Date of birth
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="form-input full-width"
            disabled={isSubmitting}
          />
        </label>
      </div>

      <div className="form-field">
        <label>
          Address public ID
          <input
            type="text"
            value={addressPublicId}
            onChange={(e) => setAddressPublicId(e.target.value)}
            className="form-input full-width"
            disabled={isSubmitting}
            placeholder="Optional"
          />
        </label>
      </div>

      <div className="form-field">
        <label>
          Certification
          <select
            value={certification}
            onChange={(e) => setCertification(e.target.value)}
            className="form-input full-width"
            disabled={isSubmitting}
          >
            <option value="">-- none --</option>
            <option value="tecnico_deportivo_grado_medio">tecnico_deportivo_grado_medio</option>
            <option value="tecnico_deportivo_grado_superior">tecnico_deportivo_grado_superior</option>
            <option value="entrenador_nacional">entrenador_nacional</option>
            <option value="entrenador_club">entrenador_club</option>
            <option value="nsca_cpt">nsca_cpt</option>
          </select>
        </label>
      </div>

      <div className="form-status">
        {localError || error ? <div className="error">{localError || error}</div> : null}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save changes'}
        </button>
        <button type="button" className="btn" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </button>
      </div>
    </form>
  );
}
