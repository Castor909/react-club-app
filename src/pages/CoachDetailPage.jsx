import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import useFetch, { requestApi } from '../hooks/useFetch';
import CoachEditForm from '../components/CoachEditForm';

function getCoachName(coach) {
  if (!coach) return 'Coach detail';
  const fullName = [coach.first_name, coach.last_name].filter(Boolean).join(' ').trim();
  return fullName || coach.name || 'Coach detail';
}

export default function CoachDetailPage() {
  const { publicId } = useParams();
  const { data, loading, error, refetch } = useFetch(`/people/coaches/${publicId}`);
  const [isEditing, setIsEditing] = useState(false);
  const [editError, setEditError] = useState('');
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const displayName = getCoachName(data);

  const handleEditSubmit = async (updates) => {
    setEditSubmitting(true);
    setEditError('');

    try {
      const response = await requestApi(`/people/coaches/${publicId}`, {
        method: 'PATCH',
        body: updates,
      });

      if (response) {
        refetch();
        setIsEditing(false);
      }
    } catch (err) {
      setEditError(err.message || 'Failed to update coach profile');
    } finally {
      setEditSubmitting(false);
    }
  };

  const navigate = useNavigate();

  const handleDeleteCoach = async () => {
    const ok = window.confirm('Delete this coach? This action cannot be undone.');
    if (!ok) return;
    setDeleting(true);
    setEditError('');

    try {
      await requestApi(`/people/coaches/${publicId}`, { method: 'DELETE' });
      navigate('/coaches');
    } catch (err) {
      setEditError(err.message || 'Failed to delete coach');
    } finally {
      setDeleting(false);
    }
  };

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
        <>
          {isEditing ? (
            <CoachEditForm
              coach={data}
              onSubmit={handleEditSubmit}
              onCancel={() => setIsEditing(false)}
              error={editError}
              isSubmitting={editSubmitting}
            />
          ) : (
            <article className="card detail-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2 style={{ margin: 0 }}>{displayName}</h2>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    className="btn btn--primary"
                    onClick={() => setIsEditing(true)}
                    style={{ fontSize: 14 }}
                    disabled={deleting}
                  >
                    Edit Profile
                  </button>
                  <button
                    className="btn btn--danger"
                    onClick={handleDeleteCoach}
                    disabled={deleting}
                    style={{ fontSize: 14 }}
                  >
                    {deleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
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
          )}
        </>
      ) : null}
    </main>
  );
}
