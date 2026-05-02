import { useState } from 'react';

export default function CoachEditForm({
  coach,
  onSubmit = () => {},
  onCancel = () => {},
  error = '',
  isSubmitting = false,
}) {
  const [email, setEmail] = useState(coach?.email || '');
  const [phone, setPhone] = useState(coach?.phone || '');
  const [speciality, setSpeciality] = useState(coach?.speciality || coach?.specialty || '');
  const [address, setAddress] = useState(coach?.address?.formatted_address || coach?.address?.name || '');
  const [localError, setLocalError] = useState('');

  const validate = () => {
    if (!email || email.trim() === '') return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Email format is invalid';
    if (!phone || phone.trim() === '') return 'Phone is required';
    if (!speciality || speciality.trim() === '') return 'Speciality is required';
    if (!address || address.trim() === '') return 'Address is required';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setLocalError(v);
    if (!v) {
      onSubmit({
        email: email.trim(),
        phone: phone.trim(),
        speciality: speciality.trim(),
        address: address.trim(),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h4>Edit Coach Profile</h4>

      <div style={{ marginBottom: 12 }}>
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

      <div style={{ marginBottom: 12 }}>
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

      <div style={{ marginBottom: 12 }}>
        <label>
          Speciality
          <input
            type="text"
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            className="form-input full-width"
            disabled={isSubmitting}
            placeholder="e.g., Yoga, Strength Training"
          />
        </label>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-input full-width"
            disabled={isSubmitting}
            placeholder="e.g., 123 Main St"
          />
        </label>
      </div>

      <div style={{ minHeight: 18 }}>
        {localError || error ? <div className="error">{localError || error}</div> : null}
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
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
