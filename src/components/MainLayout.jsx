import { useState } from 'react';
import classesData from '../data/classes.json';
import ClassList from './ClassList';
import DniForm from './DniForm';
import Confirmation from './Confirmation';
import ErrorMessage from './ErrorMessage';
import ReportIssueButton from './ReportIssueButton';
import IssueForm from './IssueForm';

export default function MainLayout() {
  const [classes] = useState(classesData);

  return (
    <main>
      <h2>MainLayout</h2>
      <section>
        <h3>Available Classes</h3>
        <ClassList classes={classes} />
      </section>

      <section>
        <h3>Report / Booking</h3>
        <DniForm />
        <ReportIssueButton />
        <IssueForm />
      </section>

      <Confirmation />
      <ErrorMessage />
    </main>
  );
}
