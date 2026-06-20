import { Suspense, lazy } from 'react';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const Volunteer = lazy(() => import('./pages/Volunteer.jsx'));
const Process = lazy(() => import('./pages/Process.jsx'));
const Animals = lazy(() => import('./pages/Animals.jsx'));
const AnimalDetail = lazy(() => import('./pages/AnimalDetail.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const AdoptionApply = lazy(() => import('./pages/AdoptionApply.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const LineCallback = lazy(() => import('./pages/LineCallback.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const Profile = lazy(() => import('./pages/Profile.jsx'));
const Favorites = lazy(() => import('./pages/Favorites.jsx'));
const ProfileApplications = lazy(() => import('./pages/ProfileApplications.jsx'));
const VisitBooking = lazy(() => import('./pages/VisitBooking.jsx'));
const AdoptionRecords = lazy(() => import('./pages/AdoptionRecords.jsx'));

function PageLoader() {
  return (
    <Center minH="48vh">
      <Spinner color="warm.orange" size="xl" thickness="4px" />
    </Center>
  );
}

export default function App() {
  return (
    <Box minH="100vh" bg="warm.cream">
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/animals" element={<Animals />} />
          <Route path="/animals/:id" element={<AnimalDetail />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/process" element={<Process />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/adoption/apply/:id" element={<AdoptionApply />} />
          <Route path="/login" element={<Login />} />
          <Route path="/line-callback" element={<LineCallback />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/applications" element={<ProfileApplications />} />
          <Route path="/profile/records" element={<AdoptionRecords />} />
          <Route path="/profile/appointments" element={<VisitBooking />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Suspense>
      <Footer />
    </Box>
  );
}
