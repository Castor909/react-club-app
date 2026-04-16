import CoachCard from './CoachCard';

function normalizeList(payload) {
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
        <CoachCard key={coach.public_id || coach.id || coach.email} coach={coach} />
      ))}
    </section>
  );
}
