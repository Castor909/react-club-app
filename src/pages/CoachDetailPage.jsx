import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import useFetch from '../hooks/useFetch';

function getCoachName(coach) {
  if (!coach) return 'Coach detail';
  const fullName = [coach.first_name, coach.last_name].filter(Boolean).join(' ').trim();
  return fullName || coach.name || 'Coach detail';
}

export default function CoachDetailPage() {
  const { publicId } = useParams();
  const { data, loading, error, refetch } = useFetch(`/people/coaches/${publicId}`);
  const displayName = getCoachName(data);

  // Build a label/value structure first, then render it in one generic map.
  // This keeps JSX compact and makes field changes (add/remove/rename) trivial.
  const detailItems = data
    ? [
        ['Email', data.email || 'N/A'],
        ['Phone', data.phone || 'N/A'],
        ['Certification', data.certification || data.speciality || data.specialty || 'N/A'],
        ['Date of birth', data.date_of_birth || 'N/A'],
        ['Address', data.address?.formatted_address || data.address?.name || 'N/A'],
      ]
    : [];

  return (
    <main className="container page-content">
      <div className="page-actions">
        <Link className="btn" to="/coaches">
          Back
        </Link>
      </div>

      {loading ? <p className="loading">Loading coach details...</p> : null}
      {!loading && error ? <ErrorMessage message={error} onRetry={refetch} /> : null}

      {!loading && !error ? (
        <article className="card detail-card">
          <h2>{displayName}</h2>
          {detailItems.length > 0 ? (
            detailItems.map(([label, value]) => (
              <p key={label}>
                <strong>{label}:</strong> {value}
              </p>
            ))
          ) : (
            <p className="muted">No coach data available.</p>
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
