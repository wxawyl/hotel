import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import i18n from '../i18n';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => i18n.language || 'en');
  const [currency, setCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({ USD: 1 });
  const [hotels, setHotels] = useState([]);
  const [services, setServices] = useState([]);
  const [cart, setCart] = useState([]);
  const [booking, setBooking] = useState({
    hotel_id: null,
    rooms: [],
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

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setLanguage(lng);
    };
    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
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
      console.log('Fetching hotels...');
      const response = await axios.get('/api/hotels');
      const hotelList = response.data.data || response.data;
      console.log('Hotels fetched:', hotelList.length);
      
      setHotels(hotelList);
      console.log('Hotels state updated:', hotelList.length);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const fetchServices = async () => {
    try {
      console.log('Fetching services...');
      const response = await axios.get('/api/services');
      const serviceList = response.data.data || response.data;
      console.log('Services fetched:', serviceList.length);
      setServices(serviceList);
      console.log('Services state updated:', serviceList.length);
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
    try {
      const parsed = typeof obj === 'string' ? JSON.parse(obj) : obj;
      return parsed[language] || parsed.en || '';
    } catch {
      return typeof obj === 'object' ? (obj[language] || obj.en || '') : obj;
    }
  };

  const updateBooking = (data) => {
    setBooking(prev => ({ ...prev, ...data }));
  };

  const resetBooking = () => {
    setBooking({
      hotel_id: null,
      rooms: [],
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
      cart,
      setCart,
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
