import { useState } from 'react';
import classesData from '../data/classes.json';
import ClassList from './ClassList';
import DniForm from './DniForm';
import Confirmation from './Confirmation';
import ErrorMessage from './ErrorMessage';
import ReportIssueButton from './ReportIssueButton';
import IssueForm from './IssueForm';

export default function MainLayout() {
  const [classes, setClasses] = useState(classesData);
  const [bookingClass, setBookingClass] = useState(null);
  const [bookingError, setBookingError] = useState('');
  const [confirmationMsg, setConfirmationMsg] = useState('');

  const handleInitiateBooking = (classItem) => {
    setBookingError('');
    setConfirmationMsg('');
    setBookingClass(classItem);
  };

  const handleBookingSubmit = (dni) => {
    // Simulate DNI check: require valid format already validated by DniForm
    if (!bookingClass) return;

    // Simulate successful booking: mark class as booked
    setClasses((prev) => prev.map((c) => (c.id === bookingClass.id ? { ...c, status: 'booked' } : c)));

    setConfirmationMsg(`You have successfully booked: ${bookingClass.name}, ${bookingClass.time}`);
    setBookingClass(null);
  };

  const handleBookingBack = () => {
    setBookingClass(null);
    setBookingError('');
  };

  return (
    <main>
      <h2>MainLayout</h2>
      <section>
        <h3>Available Classes</h3>
        <ClassList classes={classes} onBook={handleInitiateBooking} />
      </section>

      <section>
        <h3>Report / Booking</h3>
        {bookingClass ? (
          <DniForm
            title={`Enter DNI to book: ${bookingClass.name}`}
            onSubmit={handleBookingSubmit}
            onBack={handleBookingBack}
            error={bookingError}
          />
        ) : (
          <div>Select a class and click Book to begin</div>
        )}

        <ReportIssueButton />
        <IssueForm />
      </section>

      <Confirmation message={confirmationMsg} onBack={() => setConfirmationMsg('')} />
      <ErrorMessage message={bookingError} />
    </main>
  );
}
