import { useState } from 'react';
import classesData from '../data/classes.json';
import validDnis from '../data/validDnis.json';
import issuesData from '../data/issues.json';
import ClassList from './ClassList';
import DniForm from './DniForm';
import Confirmation from './Confirmation';
import ErrorMessage from './ErrorMessage';
import Modal from './Modal';
import ReportIssueButton from './ReportIssueButton';
import IssueForm from './IssueForm';

export default function MainLayout() {
  const [classes, setClasses] = useState(classesData);
  const [bookingClass, setBookingClass] = useState(null);
  const [bookingError, setBookingError] = useState('');
  const [confirmationMsg, setConfirmationMsg] = useState('');
  const [reportStep, setReportStep] = useState('idle'); // idle | dni | form
  const [reportDni, setReportDni] = useState('');
  const [reportError, setReportError] = useState('');
  const [issues, setIssues] = useState(issuesData);

  const handleInitiateBooking = (classItem) => {
    setBookingError('');
    setConfirmationMsg('');
    setBookingClass(classItem);
  };

  const handleBookingSubmit = (dni) => {
    if (!bookingClass) return;

    const entered = (dni || '').trim().toUpperCase();
    const found = validDnis.find((v) => v.dni.toUpperCase() === entered);
    if (!found || !found.active) {
      setBookingError('Error: DNI not found or inactive');
      return;
    }

    // Successful booking: mark class as booked
    setClasses((prev) => prev.map((c) => (c.id === bookingClass.id ? { ...c, status: 'booked' } : c)));
    setConfirmationMsg(`You have successfully booked: ${bookingClass.name}, ${bookingClass.time}`);
    setBookingClass(null);
  };

  const handleBookingBack = () => {
    setBookingClass(null);
    setBookingError('');
  };

  const handleStartReport = () => {
    setReportError('');
    setConfirmationMsg('');
    setReportStep('dni');
  };

  const handleReportDniSubmit = (dni) => {
    const entered = (dni || '').trim().toUpperCase();
    const found = validDnis.find((v) => v.dni.toUpperCase() === entered);
    if (!found || !found.active) {
      setReportError('Error: DNI not found or inactive');
      return;
    }
    setReportDni(entered);
    setReportError('');
    setReportStep('form');
  };

  const handleReportDniBack = () => {
    setReportDni('');
    setReportError('');
    setReportStep('idle');
  };

  const handleReportSubmit = ({ zone, type, description }) => {
    const nextId = issues.length ? Math.max(...issues.map((i) => i.id)) + 1 : 1;
    const newIssue = { id: nextId, zone, type, description, status: 'open' };
    setIssues((prev) => [newIssue, ...prev]);
    setConfirmationMsg(`Report submitted! Ticket #${newIssue.id} created.`);
    // close modal flow
    setReportStep('idle');
  };

  return (
    <main className="container">
      <h2>MainLayout</h2>
      <section>
        <h3>Available Classes</h3>
        <ClassList classes={classes} onBook={handleInitiateBooking} />
      </section>

      <section>
        <h3>Report / Booking</h3>
        <div className="muted">Select a class and tap Book to begin the booking flow.</div>

        <ReportIssueButton onClick={handleStartReport} />
      </section>

      {bookingClass && (
        <Modal open={true} onClose={handleBookingBack} title={`Book: ${bookingClass.name}`}>
          <DniForm
            title={`Enter DNI to book: ${bookingClass.name}`}
            onSubmit={handleBookingSubmit}
            onBack={handleBookingBack}
            error={bookingError}
          />
        </Modal>
      )}

      {reportStep === 'dni' && (
        <Modal open={true} onClose={handleReportDniBack} title="Verify DNI">
          <DniForm
            title={`Enter your DNI to report an issue`}
            onSubmit={handleReportDniSubmit}
            onBack={handleReportDniBack}
            error={reportError}
          />
        </Modal>
      )}

      {reportStep === 'form' && (
        <Modal open={true} onClose={() => setReportStep('idle')} title="Report an Issue">
          <IssueForm onSubmit={handleReportSubmit} />
        </Modal>
      )}

      {confirmationMsg && (
        <Modal open={true} onClose={() => setConfirmationMsg('')} title="Success">
          <Confirmation message={confirmationMsg} onBack={() => setConfirmationMsg('')} />
        </Modal>
      )}

      <ErrorMessage message={bookingError || reportError} />
    </main>
  );
}
