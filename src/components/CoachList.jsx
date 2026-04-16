import CoachCard from './CoachCard';

function normalizeList(payload) {
  // The backend can return either a plain array or a paginated shape.
  // This adapter keeps the UI stable regardless of response wrapper format.
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
}

export default function CoachList({ coachesData }) {
  const coaches = normalizeList(coachesData);

  if (!coaches.length) {
    return <p className="muted">No coaches found.</p>;
  }

  return (
    <section className="list-grid" aria-label="Coaches list">
      {coaches.map((coach) => (
        // Prefer stable API ids for React keys; fallback fields avoid crashes
        // if a fixture uses a slightly different schema.
        <CoachCard key={coach.public_id || coach.id || coach.email} coach={coach} />
      ))}
    </section>
  );
}
