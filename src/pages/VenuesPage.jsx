import ErrorMessage from '../components/ErrorMessage';
import VenueList from '../components/VenueList';
import useFetch from '../hooks/useFetch';

export default function VenuesPage() {
  const { data, loading, error, refetch } = useFetch('/inventory/venues');

  return (
    <main className="container page-content">
      <h2>Venues</h2>
      <p className="muted">Check the available club venues and view location details.</p>

      {loading ? <p className="loading">Loading venues...</p> : null}
      {!loading && error ? <ErrorMessage message={error} onRetry={refetch} /> : null}
      {!loading && !error ? <VenueList venuesData={data} /> : null}
    </main>
  );
}
