import CoachList from '../components/CoachList';
import ErrorMessage from '../components/ErrorMessage';
import useFetch from '../hooks/useFetch';

export default function CoachesPage() {
  const { data, loading, error, refetch } = useFetch('/people/coaches');

  return (
    <main className="container page-content">
      <h2>Coaches</h2>
      <p className="muted">Browse available coaches and open their profile details.</p>

      {loading ? <p className="loading">Loading coaches...</p> : null}
      {!loading && error ? <ErrorMessage message={error} onRetry={refetch} /> : null}
      {!loading && !error ? <CoachList coachesData={data} /> : null}
    </main>
  );
}
