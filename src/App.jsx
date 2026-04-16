
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainLayout from './components/MainLayout';
import CoachDetailPage from './pages/CoachDetailPage';
import CoachesPage from './pages/CoachesPage';
import VenueDetailPage from './pages/VenueDetailPage';
import VenuesPage from './pages/VenuesPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/coaches" element={<CoachesPage />} />
        <Route path="/coaches/:publicId" element={<CoachDetailPage />} />
        <Route path="/venues" element={<VenuesPage />} />
        <Route path="/venues/:publicId" element={<VenueDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
