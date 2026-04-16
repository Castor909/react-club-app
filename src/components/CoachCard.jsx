import { Link } from 'react-router-dom';

function getCoachName(coach) {
  if (!coach) return 'Unknown coach';

  const fullName = [coach.first_name, coach.last_name].filter(Boolean).join(' ').trim();
  return fullName || coach.name || 'Unknown coach';
}

export default function CoachCard({ coach }) {
  const coachId = coach?.public_id;
  const specialty = coach?.speciality || coach?.specialty || coach?.focus || 'Not specified';

  return (
    <article className="card coach-card">
      <div>
        <h3 className="item-title">{getCoachName(coach)}</h3>
        <p className="muted">Specialty: {specialty}</p>
      </div>
      {coachId ? (
        <Link className="btn btn--primary" to={`/coaches/${coachId}`}>
          View
        </Link>
      ) : (
        <button className="btn" disabled>
          Unavailable
        </button>
      )}
    </article>
  );
}
