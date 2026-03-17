import ClassList from './ClassList';
import ClassCard from './ClassCard';
import DniForm from './DniForm';
import Confirmation from './Confirmation';
import ErrorMessage from './ErrorMessage';
import ReportIssueButton from './ReportIssueButton';
import IssueForm from './IssueForm';

export default function MainLayout() {
  return (
    <div>
      <h2>MainLayout</h2>
      <ClassList />
      <ClassCard />
      <DniForm />
      <Confirmation />
      <ErrorMessage />
      <ReportIssueButton />
      <IssueForm />
    </div>
  );
}
