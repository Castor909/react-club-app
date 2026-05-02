import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import useFetch, { requestApi } from '../hooks/useFetch';
import VenueEditForm from '../components/VenueEditForm';

export default function VenueDetailPage() {
  const { publicId } = useParams();
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useFetch(`/inventory/venues/${publicId}`);
  const [isEditing, setIsEditing] = useState(false);
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [editError, setEditError] = useState('');
  const [deleting, setDeleting] = useState(false);

  const handleDeleteVenue = async () => {
    const confirmed = window.confirm('Delete this venue? This action cannot be undone.');
    if (!confirmed) return;

    setDeleting(true);
    setEditError('');

    try {
      await requestApi(`/inventory/venues/${publicId}`, {
        method: 'DELETE',
      });

      navigate('/venues');
    } catch (err) {
      setEditError(err.message || 'Failed to delete venue');
    } finally {
      setDeleting(false);
    }
  };

  const detailItems = data
    ? [
        ['Address', data.address?.formatted_address || data.address?.name || data.address?.public_id || 'N/A'],
        ['Capacity', data.capacity ?? 'N/A'],
        ['Venue type', data.venue_type || data.type || 'N/A'],
        ['Indoor', typeof data.indoor === 'boolean' ? (data.indoor ? 'Yes' : 'No') : 'N/A'],
      ]
    : [];

  return (
    <main className="container page-content">
      <div className="page-actions">
        <Link className="btn" to="/venues">
          Back
        </Link>
        <div style={{ display: 'inline-flex', gap: 8, marginLeft: 8 }}>
          <button className="btn btn--primary" onClick={() => setIsEditing(true)} disabled={isEditing || deleting}>
            Edit Venue
          </button>
          <button className="btn btn--danger" onClick={handleDeleteVenue} disabled={deleting || isEditing}>
            {deleting ? 'Deleting...' : 'Delete Venue'}
          </button>
        </div>
      </div>

      {loading ? <p className="loading">Loading venue details...</p> : null}
      {!loading && error ? <ErrorMessage message={error} onRetry={refetch} /> : null}

      {!loading && !error ? (
        <>
          {isEditing ? (
            <VenueEditForm
              venue={data}
              onSubmit={async (updates) => {
                setEditSubmitting(true);
                setEditError('');
                try {
                  await requestApi(`/inventory/venues/${publicId}`, { method: 'PATCH', body: updates });
                  refetch();
                  setIsEditing(false);
                } catch (err) {
                  setEditError(err.message || 'Failed to update venue');
                } finally {
                  setEditSubmitting(false);
                }
              }}
              onCancel={() => setIsEditing(false)}
              isSubmitting={editSubmitting}
              error={editError}
            />
          ) : (
            <article className="card detail-card">
              <h2>{data?.name || data?.venue_name || 'Venue details'}</h2>
              {detailItems.length > 0 ? (
                detailItems.map(([label, value]) => (
                  <p key={label}>
                    <strong>{label}:</strong> {value}
                  </p>
                ))
              ) : (
                <p className="muted">No venue data available.</p>
              )}
              {data ? null : <p className="muted">No payload received from the API.</p>}
              <details className="raw-debug">
                <summary>Raw API data</summary>
                <pre>{JSON.stringify(data, null, 2)}</pre>
              </details>
            </article>
          )}
        </>
      ) : null}
    </main>
  );
}
