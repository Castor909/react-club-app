import ClassCard from './ClassCard';

export default function ClassList({ classes = [], onBook = () => {} }) {
  return (
    <div>
      <h4>Class List</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {classes.map((c) => (
          <li key={c.id} style={{ marginBottom: 8 }}>
            <ClassCard classItem={c} onBook={onBook} />
          </li>
        ))}
      </ul>
    </div>
  );
}
