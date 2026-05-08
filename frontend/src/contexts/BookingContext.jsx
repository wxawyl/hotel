import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({ USD: 1 });
  const [hotels, setHotels] = useState([]);
  const [services, setServices] = useState([]);
  const [booking, setBooking] = useState({
    hotel_id: null,
    room_id: null,
    check_in: '',
    check_out: '',
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    services: [],
    notes: ''
  });

  useEffect(() => {
    fetchExchangeRates();
    fetchHotels();
    fetchServices();
  }, []);

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get('/api/settings/exchange-rates');
      setExchangeRates(response.data.data || response.data);
    } catch (error) {
      console.error('Error fetching rates:', error);
    }
  };

  const fetchHotels = async () => {
    try {
      const response = await axios.get('/api/hotels');
      const hotelList = response.data.data || response.data;
      
      const hotelsWithImages = await Promise.all(
        hotelList.map(async (hotel) => {
          try {
            const imagesResponse = await axios.get(`/api/images/hotel/${hotel.id}?category=banner`);
            const images = imagesResponse.data.data || imagesResponse.data;
            return {
              ...hotel,
              images: images.slice(0, 5),
              mainImage: images[0]?.thumbnail_url || images[0]?.url || null
            };
          } catch (err) {
            return { ...hotel, images: [], mainImage: null };
          }
        })
      );
      
      setHotels(hotelsWithImages);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services');
      setServices(response.data.data || response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const convertPrice = (priceUSD) => {
    const rate = exchangeRates[currency] || 1;
    return (priceUSD * rate).toFixed(2);
  };

  const getLocaleText = (obj) => {
    if (!obj) return '';
    return obj[language] || obj.en || '';
  };

  const updateBooking = (data) => {
    setBooking(prev => ({ ...prev, ...data }));
  };

  const resetBooking = () => {
    setBooking({
      hotel_id: null,
      room_id: null,
      check_in: '',
      check_out: '',
      guest_name: '',
      guest_email: '',
      guest_phone: '',
      services: [],
      notes: ''
    });
  };

  return (
    <BookingContext.Provider value={{
      language,
      setLanguage,
      currency,
      setCurrency,
      exchangeRates,
      hotels,
      services,
      booking,
      updateBooking,
      resetBooking,
      convertPrice,
      getLocaleText
    }}>
      {children}
    </BookingContext.Provider>
  );
};
