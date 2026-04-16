import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import useFetch from '../hooks/useFetch';

export default function VenueDetailPage() {
  const { publicId } = useParams();
  const { data, loading, error, refetch } = useFetch(`/inventory/venues/${publicId}`);

  // Normalize backend fields into stable labels before rendering.
  // This prevents repeated inline fallback chains in JSX and keeps the UI readable.
  const detailItems = data
    ? [
        ['Location', data.location || data.city || 'N/A'],
        ['Address', data.address?.formatted_address || data.address?.name || 'N/A'],
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
      </div>

      {loading ? <p className="loading">Loading venue details...</p> : null}
      {!loading && error ? <ErrorMessage message={error} onRetry={refetch} /> : null}

      {!loading && !error ? (
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
      ) : null}
    </main>
  );
}
