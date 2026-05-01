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
import { requestApi } from '../hooks/useFetch';

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const BOOKING_MUTATION_PATH = import.meta.env.VITE_PHASE3_BOOKING_PATH || '/classes/bookings';
const ISSUE_MUTATION_PATH = import.meta.env.VITE_PHASE3_ISSUE_PATH || '/issues';
const USE_MOCK_MUTATIONS = import.meta.env.VITE_PHASE3_USE_MOCK_MUTATIONS !== 'false';

export default function MainLayout() {
  // This screen is the preserved Phase 1 flow.
  // It intentionally runs on local JSON so booking/reporting can be demonstrated
  // without backend write endpoints (writes are planned for the next phase).
  const [classes, setClasses] = useState(classesData);
  const [bookingClass, setBookingClass] = useState(null);
  const [bookingError, setBookingError] = useState('');
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [confirmationMsg, setConfirmationMsg] = useState('');
  const [reportStep, setReportStep] = useState('idle'); // idle | dni | form
  const [, setReportDni] = useState('');
  const [reportError, setReportError] = useState('');
  const [reportSubmitting, setReportSubmitting] = useState(false);
  const [issues, setIssues] = useState(issuesData);

  const handleInitiateBooking = (classItem) => {
    setBookingError('');
    setConfirmationMsg('');
    setBookingClass(classItem);
  };

  const completeBookingLocally = (classItem) => {
    setClasses((prev) => prev.map((c) => (c.id === classItem.id ? { ...c, status: 'booked' } : c)));
    setConfirmationMsg(`You have successfully booked: ${classItem.name}, ${classItem.time}`);
    setBookingClass(null);
  };

  const handleBookingSubmit = async (dni) => {
    if (!bookingClass) return;
    if (bookingSubmitting) return;

    const entered = (dni || '').trim().toUpperCase();
    const found = validDnis.find((v) => v.dni.toUpperCase() === entered);
    if (!found || !found.active) {
      setBookingError('Error: DNI not found or inactive');
      return;
    }

    setBookingSubmitting(true);
    setBookingError('');

    try {
      const payload = {
        class_id: bookingClass.id,
        dni: entered,
      };

      let apiResponse = null;

      try {
        apiResponse = await requestApi(BOOKING_MUTATION_PATH, {
          method: 'POST',
          body: payload,
        });
      } catch (apiError) {
        if (!USE_MOCK_MUTATIONS) {
          throw apiError;
        }
      }

      if (apiResponse && typeof apiResponse === 'object' && apiResponse.class) {
        setClasses((prev) => prev.map((c) => (c.id === apiResponse.class.id ? { ...c, ...apiResponse.class } : c)));
        setConfirmationMsg(apiResponse.message || `You have successfully booked: ${bookingClass.name}, ${bookingClass.time}`);
        setBookingClass(null);
        return;
      }

      await wait(350);
      completeBookingLocally(bookingClass);
    } finally {
      setBookingSubmitting(false);
    }
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

  const handleReportSubmit = async ({ zone, type, description }) => {
    if (reportSubmitting) return;

    setReportSubmitting(true);

    try {
      const payload = {
        zone,
        type,
        description,
      };

      let apiResponse = null;

      try {
        apiResponse = await requestApi(ISSUE_MUTATION_PATH, {
          method: 'POST',
          body: payload,
        });
      } catch (apiError) {
        if (!USE_MOCK_MUTATIONS) {
          throw apiError;
        }
      }

      if (apiResponse && typeof apiResponse === 'object' && apiResponse.issue) {
        setIssues((prev) => [apiResponse.issue, ...prev]);
        setConfirmationMsg(apiResponse.message || `Report submitted! Ticket #${apiResponse.issue.id} created.`);
        setReportStep('idle');
        return;
      }

      await wait(350);

      const nextId = issues.length ? Math.max(...issues.map((i) => i.id)) + 1 : 1;
      const newIssue = { id: nextId, zone, type, description, status: 'open' };
      setIssues((prev) => [newIssue, ...prev]);
      setConfirmationMsg(`Report submitted! Ticket #${newIssue.id} created.`);
      // close modal flow
      setReportStep('idle');
    } finally {
      setReportSubmitting(false);
    }
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
            isSubmitting={bookingSubmitting}
            submitLabel={bookingSubmitting ? 'Booking...' : 'Confirm booking'}
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
          <IssueForm
            onSubmit={handleReportSubmit}
            isSubmitting={reportSubmitting}
            submitLabel={reportSubmitting ? 'Submitting...' : 'Submit report'}
          />
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
