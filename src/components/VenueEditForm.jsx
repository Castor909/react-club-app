import { useState } from 'react';

export default function VenueEditForm({ venue = {}, onSubmit = () => {}, onCancel = () => {}, isSubmitting = false, error = '' }) {
  const [name, setName] = useState(venue.name || venue.venue_name || '');
  const [address, setAddress] = useState(venue.address?.formatted_address || venue.address?.name || '');
  const [capacity, setCapacity] = useState(venue.capacity ?? '');
  const [venueType, setVenueType] = useState(venue.venue_type || venue.type || '');
  const [localError, setLocalError] = useState('');

  const validate = () => {
    if (!name || !name.trim()) return 'Name is required';
    if (!address || !address.trim()) return 'Address is required';
    if (capacity === '' || isNaN(Number(capacity)) || Number(capacity) < 0) return 'Capacity must be a non-negative number';
    if (!venueType || !venueType.trim()) return 'Venue type is required';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setLocalError(v);
    if (!v) {
      onSubmit({ name: name.trim(), address: address.trim(), capacity: Number(capacity), venue_type: venueType.trim() });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card modal-form">
      <h4>Edit Venue</h4>

      <label>
        Name
        <input className="form-input full-width" value={name} onChange={(e) => setName(e.target.value)} disabled={isSubmitting} />
      </label>

      <label>
        Address
        <input className="form-input full-width" value={address} onChange={(e) => setAddress(e.target.value)} disabled={isSubmitting} />
      </label>

      <label>
        Capacity
        <input type="number" className="form-input full-width" value={capacity} onChange={(e) => setCapacity(e.target.value)} disabled={isSubmitting} />
      </label>

      <label>
        Venue type
        <input className="form-input full-width" value={venueType} onChange={(e) => setVenueType(e.target.value)} disabled={isSubmitting} />
      </label>

      <div style={{ minHeight: 18, marginTop: 8 }}>{localError || error ? <div className="error">{localError || error}</div> : null}</div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button type="submit" className="btn btn--primary" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save changes'}</button>
        <button type="button" className="btn btn--outline" onClick={onCancel} disabled={isSubmitting}>Cancel</button>
      </div>
    </form>
  );
}
