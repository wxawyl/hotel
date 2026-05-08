import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { format, differenceInDays } from 'date-fns';
import { enUS, de, ko, ja, zhCN, vi } from 'date-fns/locale';
import { BookingContext } from '../contexts/BookingContext';
import { getRoomImage, getServiceImage } from '../utils/imageGenerator';
import Modal from '../components/Modal';
import 'react-datepicker/dist/react-datepicker.css';

const Booking = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const {
    hotels,
    rooms,
    services,
    booking,
    updateBooking,
    resetBooking,
    convertPrice,
    currency,
    language,
    getLocaleText,
    cart,
    setCart
  } = useContext(BookingContext);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotelRooms, setHotelRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const getNights = () => {
    if (!checkInDate || !checkOutDate) return 1;
    return differenceInDays(checkOutDate, checkInDate) || 1;
  };

  const dateLocaleMap = {
    en: enUS,
    de: de,
    ko: ko,
    ja: ja,
    zh: zhCN,
    vi: vi,
  };

  useEffect(() => {
    if (booking.hotel_id) {
      setSelectedHotel(hotels.find(h => h.id === parseInt(booking.hotel_id)));
    }
  }, [booking.hotel_id, hotels]);

  if (!hotels.length || !services.length) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean mb-4"></div>
            <p className="text-gray-600">Loading hotels and services...</p>
            <p className="text-sm text-gray-400 mt-2">hotels: {hotels.length}, services: {services.length}</p>
          </div>
        </div>
      </div>
    );
  }

  const handleHotelChange = async (hotelId) => {
    updateBooking({ hotel_id: parseInt(hotelId), rooms: [] });
    try {
      const response = await axios.get(`/api/rooms/hotel/${hotelId}`);
      if (response.data.success) {
        setHotelRooms(response.data.data);
      } else {
        setHotelRooms([]);
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setHotelRooms([]);
    }
  };

  const handleRoomSelect = (room) => {
    const selectedRooms = booking.rooms || [];
    const exists = selectedRooms.find(r => r.id === room.id);
    if (exists) {
      updateBooking({ rooms: selectedRooms.filter(r => r.id !== room.id) });
    } else {
      updateBooking({ rooms: [...selectedRooms, { ...room, quantity: 1 }] });
    }
  };

  const updateRoomQuantity = (roomId, quantity) => {
    if (quantity < 1) {
      const selectedRooms = booking.rooms || [];
      updateBooking({ rooms: selectedRooms.filter(r => r.id !== roomId) });
      return;
    }
    const selectedRooms = booking.rooms || [];
    const exists = selectedRooms.find(r => r.id === roomId);
    if (exists) {
      updateBooking({
        rooms: selectedRooms.map(r => r.id === roomId ? { ...r, quantity } : r)
      });
    } else {
      const room = hotelRooms.find(r => r.id === roomId);
      if (room) {
        updateBooking({ rooms: [...selectedRooms, { ...room, quantity }] });
      }
    }
  };

  const handleServiceToggle = (service) => {
    const selectedServices = booking.services || [];
    const exists = selectedServices.find(s => s.id === service.id);
    if (exists) {
      updateBooking({ services: selectedServices.filter(s => s.id !== service.id) });
    } else {
      updateBooking({ services: [...selectedServices, { ...service, quantity: 1 }] });
    }
  };

  const updateServiceQuantity = (serviceId, quantity) => {
    if (quantity < 1) {
      const selectedServices = booking.services || [];
      updateBooking({ services: selectedServices.filter(s => s.id !== serviceId) });
      return;
    }
    const selectedServices = booking.services || [];
    const exists = selectedServices.find(s => s.id === serviceId);
    if (exists) {
      updateBooking({
        services: selectedServices.map(s => s.id === serviceId ? { ...s, quantity } : s)
      });
    } else {
      const service = services.find(s => s.id === serviceId);
      if (service) {
        updateBooking({ services: [...selectedServices, { ...service, quantity }] });
      }
    }
  };

  const calculateTotal = () => {
    let total = 0;
    const nights = getNights();
    
    (booking.rooms || []).forEach(room => {
      total += (room.price || 0) * (room.quantity || 1) * nights;
    });
    
    (booking.services || []).forEach(service => {
      let multiplier = service.quantity || 1;
      
      const serviceName = typeof service.name === 'string' ? service.name : (service.name?.en || service.name_locale?.en || '');
      const lowerName = serviceName.toLowerCase();
      
      if (lowerName.includes('breakfast')) {
        multiplier *= nights;
      }
      
      if (lowerName.includes('pickup') || lowerName.includes('transfer')) {
        multiplier = 2;
      }
      
      total += (service.price || 0) * multiplier;
    });
    
    return total;
  };
  
  const formatTotal = () => {
    return convertPrice(calculateTotal());
  };

  const openRoomDetails = (room) => {
    setSelectedRoom(room);
    setIsRoomModalOpen(true);
  };

  const openServiceDetails = (service) => {
    setSelectedService(service);
    setIsServiceModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const bookingItems = [];
    
    const nights = getNights();
    
    (booking.rooms || []).forEach(room => {
      bookingItems.push({
        id: `room-${room.id}`,
        name: getLocaleText(room.name_locale) || room.name,
        price: room.price * nights,
        quantity: room.quantity || 1,
        type: 'room',
        nights: nights
      });
    });
    
    (booking.services || []).forEach(service => {
      let multiplier = service.quantity || 1;
      let displayPrice = service.price || 0;
      
      const serviceName = typeof service.name === 'string' ? service.name : (service.name?.en || service.name_locale?.en || '');
      const lowerName = serviceName.toLowerCase();
      
      if (lowerName.includes('breakfast')) {
        multiplier = nights;
        displayPrice = (service.price || 0) * nights;
      }
      
      if (lowerName.includes('pickup') || lowerName.includes('transfer')) {
        multiplier = 2;
        displayPrice = (service.price || 0) * 2;
      }
      
      bookingItems.push({
        id: `service-${service.id}`,
        name: getLocaleText(service.name) || getLocaleText(service.name_locale) || 'Service',
        price: displayPrice,
        quantity: 1,
        type: 'service',
        multiplier: multiplier
      });
    });
    
    setCart(bookingItems);
    navigate('/checkout');
  };

  if (bookingSuccess) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4">{t('booking.success')}</h1>
          <p className="text-xl text-gray-600 mb-2">Booking Number</p>
          <p className="text-3xl font-bold text-ocean mb-8">{bookingSuccess}</p>
          <button
            onClick={() => setBookingSuccess(null)}
            className="btn-primary"
          >
            Make Another Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-12">{t('book.now')}</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="card p-6">
            <h2 className="text-2xl font-bold mb-6">{t('select.hotel')}</h2>
            <select
              value={booking.hotel_id || ''}
              onChange={(e) => handleHotelChange(e.target.value)}
              className="input"
              required
            >
              <option value="">Select a hotel</option>
              {hotels.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {getLocaleText(hotel.name)}
                </option>
              ))}
            </select>
          </section>

          {selectedHotel && (
            <section className="card p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{t('select.room')}</h2>
              </div>
              <div className="space-y-4">
                {hotelRooms.map((room) => {
                  const selectedRoom = (booking.rooms || []).find(r => r.id === room.id);
                  const isSelected = !!selectedRoom;
                  return (
                    <div
                      key={room.id}
                      className={`block border-2 rounded-lg p-4 transition-all ${
                        isSelected
                          ? 'border-ocean bg-ocean/5'
                          : 'border-gray-200 hover:border-ocean'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        <div 
                          className="w-full md:w-32 h-24 overflow-hidden rounded-lg bg-gradient-to-br from-sand to-gray-200 cursor-pointer flex-shrink-0"
                          onClick={() => openRoomDetails(room)}
                        >
                          <img
                            src={getRoomImage(room.id)}
                            alt={getLocaleText(room.name)}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-bold">{getLocaleText(room.name)}</h3>
                              <button
                                onClick={() => openRoomDetails(room)}
                                className="text-ocean text-sm hover:underline"
                              >
                                {t('view.details')}
                              </button>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateRoomQuantity(room.id, (selectedRoom?.quantity || 1) - 1)}
                                  className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                  </svg>
                                </button>
                                <span className="w-8 text-center font-medium">{selectedRoom?.quantity || 0}</span>
                                <button
                                  onClick={() => updateRoomQuantity(room.id, (selectedRoom?.quantity || 0) + 1)}
                                  className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                  </svg>
                                </button>
                              </div>
                              <p className="text-xl font-bold text-ocean">
                                {currency} {convertPrice(room.price * (selectedRoom?.quantity || 0))}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-3 mt-2">
                            <span className="text-xs text-gray-500">{room.capacity} {t('guests')}</span>
                            <span className="text-xs text-gray-500">{room.area} m²</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          <section className="card p-4">
            <h2 className="text-xl font-bold mb-4">{t('add.services')}</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {services.map((service) => {
                const serviceName = service.name || service.name_locale;
                const imageUrl = getServiceImage(serviceName);
                const selectedService = (booking.services || []).find(s => s.id === service.id);
                const isSelected = !!selectedService;
                
                return (
                  <div
                    key={service.id}
                    className={`block border-2 rounded-lg overflow-hidden transition-all ${
                      isSelected
                        ? 'border-ocean bg-ocean/5'
                        : 'border-gray-200 hover:border-ocean'
                    }`}
                  >
                    <div className="p-3 flex items-center gap-3">
                      <div 
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center cursor-pointer ${
                          isSelected ? 'border-ocean bg-ocean' : 'border-gray-300'
                        }`}
                        onClick={() => handleServiceToggle(service)}
                      >
                        {isSelected && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div 
                        className="h-20 w-28 overflow-hidden rounded-lg cursor-pointer flex-shrink-0"
                        onClick={() => openServiceDetails(service)}
                      >
                        <img
                          src={imageUrl}
                          alt={getLocaleText(serviceName) || 'Service'}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm truncate">{getLocaleText(serviceName) || 'Service'}</h3>
                          <button
                            onClick={() => openServiceDetails(service)}
                            className="text-ocean text-xs hover:underline whitespace-nowrap"
                          >
                            {t('view.details')}
                          </button>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateServiceQuantity(service.id, (selectedService?.quantity || 1) - 1)}
                              className="w-6 h-6 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center text-xs"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-xs font-medium">{selectedService?.quantity || 0}</span>
                            <button
                              onClick={() => updateServiceQuantity(service.id, (selectedService?.quantity || 0) + 1)}
                              className="w-6 h-6 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center text-xs"
                            >
                              +
                            </button>
                          </div>
                          <p className="text-lg font-bold text-ocean">
                            {currency} {convertPrice((service.price || 0) * (selectedService?.quantity || 0))}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="card p-4">
            <h2 className="text-xl font-bold mb-3">{t('booking.dates')}</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1.5">{t('check.in')}</label>
                <DatePicker
                  selected={checkInDate}
                  onChange={(date) => {
                    setCheckInDate(date);
                    updateBooking({ check_in: date ? format(date, 'yyyy-MM-dd HH:mm') : '' });
                  }}
                  locale={dateLocaleMap[language] || enUS}
                  dateFormat="PPP HH:mm"
                  minDate={new Date()}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  className="input text-sm px-3 py-2 w-full"
                  placeholderText={t('select.date')}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5">{t('check.out')}</label>
                <DatePicker
                  selected={checkOutDate}
                  onChange={(date) => {
                    setCheckOutDate(date);
                    updateBooking({ check_out: date ? format(date, 'yyyy-MM-dd HH:mm') : '' });
                  }}
                  locale={dateLocaleMap[language] || enUS}
                  dateFormat="PPP HH:mm"
                  minDate={checkInDate || new Date()}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  className="input text-sm px-3 py-2 w-full"
                  placeholderText={t('select.date')}
                />
              </div>
            </div>
          </section>

          <section className="card p-4">
            <h2 className="text-xl font-bold mb-3">{t('guest.info')}</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1.5">{t('guest.name')}</label>
                <input
                  type="text"
                  value={booking.guest_name}
                  onChange={(e) => updateBooking({ guest_name: e.target.value })}
                  className="input text-sm px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5">{t('guest.email')}</label>
                <input
                  type="email"
                  value={booking.guest_email}
                  onChange={(e) => updateBooking({ guest_email: e.target.value })}
                  className="input text-sm px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5">{t('guest.phone')}</label>
                <input
                  type="tel"
                  value={booking.guest_phone}
                  onChange={(e) => updateBooking({ guest_phone: e.target.value })}
                  className="input text-sm px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5">{t('booking.notes')}</label>
                <textarea
                  value={booking.notes}
                  onChange={(e) => updateBooking({ notes: e.target.value })}
                  className="input text-sm px-3 py-2"
                  rows={2}
                />
              </div>
            </div>
          </section>

          <section className="card p-4 bg-gradient-to-br from-sand to-cream">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">{t('total.price')}</h2>
              <p className="text-2xl font-bold text-ocean">{currency} {formatTotal()}</p>
            </div>
          </section>

          <button
            type="submit"
            disabled={!booking.hotel_id || !(booking.rooms && booking.rooms.length > 0) || !booking.check_in || !booking.check_out}
            className="btn-primary w-full py-4 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('confirm.booking')}
          </button>
        </form>

        <Modal
          isOpen={isRoomModalOpen}
          onClose={() => setIsRoomModalOpen(false)}
          title={selectedRoom ? getLocaleText(selectedRoom.name) : ''}
          size="xl"
        >
          {selectedRoom && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={getRoomImage(selectedRoom.id)}
                    alt={getLocaleText(selectedRoom.name)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20hotel%20room%20interior%20${getLocaleText(selectedRoom.name)}&image_size=landscape_16_9`}
                    alt={getLocaleText(selectedRoom.name)}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-3">{t('description')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {getLocaleText(selectedRoom.description)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-sand/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-ocean mb-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="font-medium">{t('max.guests')}</span>
                  </div>
                  <p className="text-2xl font-bold">{selectedRoom.capacity}</p>
                </div>
                <div className="bg-sand/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-ocean mb-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                    </svg>
                    <span className="font-medium">{t('area')}</span>
                  </div>
                  <p className="text-2xl font-bold">{selectedRoom.area} m²</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-3">{t('facilities')}</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRoom.facilities?.map((facility, idx) => (
                    <span key={idx} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full">
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal>

        <Modal
          isOpen={isServiceModalOpen}
          onClose={() => setIsServiceModalOpen(false)}
          title={selectedService ? getLocaleText(selectedService.name) : ''}
          size="lg"
        >
          {selectedService && (
            <div className="space-y-6">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src={getServiceImage(selectedService.name)}
                  alt={getLocaleText(selectedService.name)}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-3">{t('description')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {getLocaleText(selectedService.description)}
                </p>
              </div>
              <div className="bg-ocean/10 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{t('price')}</span>
                  <span className="text-2xl font-bold text-ocean">
                    {currency} {convertPrice(selectedService.price)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Booking;
