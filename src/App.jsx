import { Box } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Volunteer from './pages/Volunteer.jsx';
import Process from './pages/Process.jsx';
import Animals from './pages/Animals.jsx';
import AnimalDetail from './pages/AnimalDetail.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import AdoptionApply from './pages/AdoptionApply.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import Favorites from './pages/Favorites.jsx';

export default function App() {
  return (
    <Box minH="100vh" bg="warm.cream">
      <Navbar />
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
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <Footer />
    </Box>
  );
}
