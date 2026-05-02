import { useState } from 'react';

export default function VenueEditForm({ venue = {}, onSubmit = () => {}, onCancel = () => {}, isSubmitting = false, error = '' }) {
  const [name, setName] = useState(venue.name || venue.venue_name || '');
  const [addressPublicId, setAddressPublicId] = useState(venue.address?.public_id || '');
  const [capacity, setCapacity] = useState(venue.capacity ?? '');
  const [venueType, setVenueType] = useState(venue.venue_type || venue.type || 'FIELD');
  const [indoor, setIndoor] = useState(Boolean(venue.indoor));
  const [localError, setLocalError] = useState('');

  const validate = () => {
    if (!name || !name.trim()) return 'Name is required';
    if (capacity === '' || isNaN(Number(capacity)) || Number(capacity) < 0) return 'Capacity must be a non-negative number';
    if (!venueType || !venueType.trim()) return 'Venue type is required';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setLocalError(v);
    if (!v) {
      onSubmit({
        name: name.trim(),
        capacity: Number(capacity),
        venue_type: venueType,
        address_public_id: addressPublicId.trim() || null,
        indoor,
      });
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
        Address public ID
        <input
          className="form-input full-width"
          value={addressPublicId}
          onChange={(e) => setAddressPublicId(e.target.value)}
          disabled={isSubmitting}
          placeholder="Optional"
        />
      </label>

      <label>
        Capacity
        <input type="number" className="form-input full-width" value={capacity} onChange={(e) => setCapacity(e.target.value)} disabled={isSubmitting} />
      </label>

      <label>
        Venue type
        <select className="form-input full-width" value={venueType} onChange={(e) => setVenueType(e.target.value)} disabled={isSubmitting}>
          <option value="FIELD">FIELD</option>
          <option value="stadium">stadium</option>
          <option value="gymnasium">gymnasium</option>
          <option value="TRACK">TRACK</option>
        </select>
      </label>

      <label>
        Indoor
        <select className="form-input full-width" value={indoor ? 'yes' : 'no'} onChange={(e) => setIndoor(e.target.value === 'yes')} disabled={isSubmitting}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </label>

      <div style={{ minHeight: 18, marginTop: 8 }}>{localError || error ? <div className="error">{localError || error}</div> : null}</div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button type="submit" className="btn btn--primary" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save changes'}</button>
        <button type="button" className="btn btn--outline" onClick={onCancel} disabled={isSubmitting}>Cancel</button>
      </div>
    </form>
  );
}
