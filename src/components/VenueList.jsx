import { Link } from 'react-router-dom';

function normalizeList(payload) {
  // Accept both direct arrays and paginated containers.
  // This avoids rewriting rendering logic if API response wrapping changes.
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
}

function getVenueName(venue) {
  return venue?.name || venue?.venue_name || 'Unknown venue';
}

export default function VenueList({ venuesData }) {
  const venues = normalizeList(venuesData);

  if (!venues.length) {
    return <p className="muted">No venues found.</p>;
  }

  return (
    <section className="list-grid" aria-label="Venues list">
      {venues.map((venue) => {
        const venueId = venue?.public_id;
        return (
          // Keep key and route id resilient to minor schema differences.
          <article className="card coach-card" key={venueId || venue?.id || venue?.name}>
            <div>
              <h3 className="item-title">{getVenueName(venue)}</h3>
              <p className="muted">Type: {venue?.venue_type || venue?.type || 'N/A'}</p>
            </div>
            {venueId ? (
              <Link className="btn btn--primary" to={`/venues/${venueId}`}>
                View
              </Link>
            ) : (
              <button className="btn" disabled>
                Unavailable
              </button>
            )}
          </article>
        );
      })}
    </section>
  );
}
