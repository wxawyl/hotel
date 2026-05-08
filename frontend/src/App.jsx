import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BookingProvider } from './contexts/BookingContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import FloatingAssistant from './components/FloatingAssistant';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import HotelDetail from './pages/HotelDetail';
import Booking from './pages/Booking';
import Culture from './pages/Culture';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import TestPage from './pages/TestPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main>
          <Home />
        </main>
        <Footer />
      </div>
    ),
  },
  {
    path: '/hotels',
    element: (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main>
          <Hotels />
        </main>
        <Footer />
      </div>
    ),
  },
  {
    path: '/hotel/:id',
    element: (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main>
          <HotelDetail />
        </main>
        <Footer />
      </div>
    ),
  },
  {
    path: '/products',
    element: (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main>
          <Products />
        </main>
        <Footer />
      </div>
    ),
  },
  {
    path: '/book',
    element: (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main>
          <Booking />
        </main>
        <Footer />
      </div>
    ),
  },
  {
    path: '/culture',
    element: (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main>
          <Culture />
        </main>
        <Footer />
      </div>
    ),
  },
  {
    path: '/contact',
    element: (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main>
          <Contact />
        </main>
        <Footer />
      </div>
    ),
  },
  {
    path: '/test',
    element: (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main>
          <TestPage />
        </main>
        <Footer />
      </div>
    ),
  },
  {
    path: '/checkout',
    element: (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main>
          <Checkout />
        </main>
        <Footer />
      </div>
    ),
  },
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <BookingProvider>
      <RouterProvider router={router} />
      <FloatingAssistant onOpenChat={() => setIsChatbotOpen(true)} />
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </BookingProvider>
  );
}

export default App;
