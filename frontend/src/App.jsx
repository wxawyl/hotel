import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './contexts/BookingContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import HotelDetail from './pages/HotelDetail';
import Booking from './pages/Booking';
import Culture from './pages/Culture';
import Contact from './pages/Contact';

function App() {
  return (
    <BookingProvider>
      <Router>
        <div className="min-h-screen bg-cream">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/hotel/:id" element={<HotelDetail />} />
              <Route path="/book" element={<Booking />} />
              <Route path="/culture" element={<Culture />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </BookingProvider>
  );
}

export default App;
