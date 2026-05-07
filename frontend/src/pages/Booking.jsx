import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { BookingContext } from '../contexts/BookingContext';

const Booking = () => {
  const { t } = useTranslation();
  const {
    hotels,
    rooms,
    services,
    booking,
    updateBooking,
    resetBooking,
    convertPrice,
    currency,
    getLocaleText
  } = useContext(BookingContext);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotelRooms, setHotelRooms] = useState([]);

  const handleHotelChange = async (hotelId) => {
    updateBooking({ hotel_id: hotelId, room_id: null });
    setSelectedHotel(hotels.find(h => h.id === parseInt(hotelId)));
    try {
      const response = await axios.get(`/api/rooms/hotel/${hotelId}`);
      setHotelRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleServiceToggle = (service) => {
    const isSelected = booking.services.some(s => s.id === service.id);
    if (isSelected) {
      updateBooking({ services: booking.services.filter(s => s.id !== service.id) });
    } else {
      updateBooking({ services: [...booking.services, service] });
    }
  };

  const calculateTotal = () => {
    const selectedRoom = hotelRooms.find(r => r.id === booking.room_id);
    if (!selectedRoom) return 0;

    let total = selectedRoom.price;
    booking.services.forEach(s => {
      total += s.price;
    });

    return convertPrice(total);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/bookings', {
        ...booking,
        total_price: parseFloat(calculateTotal()),
        currency,
      });
      setBookingSuccess(response.data.booking_number);
      resetBooking();
    } catch (error) {
      console.error('Error creating booking:', error);
    }
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
              <h2 className="text-2xl font-bold mb-6">{t('select.room')}</h2>
              <div className="space-y-4">
                {hotelRooms.map((room) => (
                  <label
                    key={room.id}
                    className={`block border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      booking.room_id === room.id
                        ? 'border-ocean bg-ocean/5'
                        : 'border-gray-200 hover:border-ocean'
                    }`}
                  >
                    <input
                      type="radio"
                      name="room"
                      value={room.id}
                      checked={booking.room_id === room.id}
                      onChange={() => updateBooking({ room_id: room.id })}
                      className="hidden"
                    />
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold">{getLocaleText(room.name)}</h3>
                        <p className="text-gray-600 text-sm">{getLocaleText(room.description)}</p>
                      </div>
                      <p className="text-xl font-bold text-ocean">
                        {currency} {convertPrice(room.price)}/night
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </section>
          )}

          <section className="card p-6">
            <h2 className="text-2xl font-bold mb-6">{t('add.services')}</h2>
            <div className="space-y-4">
              {services.map((service) => (
                <label
                  key={service.id}
                  className={`block border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    booking.services.some(s => s.id === service.id)
                      ? 'border-ocean bg-ocean/5'
                      : 'border-gray-200 hover:border-ocean'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{getLocaleText(service.name)}</h3>
                      <p className="text-gray-600 text-sm">{getLocaleText(service.description)}</p>
                    </div>
                    <p className="text-xl font-bold text-ocean">
                      {currency} {convertPrice(service.price)}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={booking.services.some(s => s.id === service.id)}
                    onChange={() => handleServiceToggle(service)}
                    className="hidden"
                  />
                </label>
              ))}
            </div>
          </section>

          <section className="card p-6">
            <h2 className="text-2xl font-bold mb-6">Dates</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t('check.in')}</label>
                <input
                  type="date"
                  value={booking.check_in}
                  onChange={(e) => updateBooking({ check_in: e.target.value })}
                  className="input"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('check.out')}</label>
                <input
                  type="date"
                  value={booking.check_out}
                  onChange={(e) => updateBooking({ check_out: e.target.value })}
                  className="input"
                  required
                  min={booking.check_in || new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          </section>

          <section className="card p-6">
            <h2 className="text-2xl font-bold mb-6">{t('guest.info')}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t('guest.name')}</label>
                <input
                  type="text"
                  value={booking.guest_name}
                  onChange={(e) => updateBooking({ guest_name: e.target.value })}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('guest.email')}</label>
                <input
                  type="email"
                  value={booking.guest_email}
                  onChange={(e) => updateBooking({ guest_email: e.target.value })}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('guest.phone')}</label>
                <input
                  type="tel"
                  value={booking.guest_phone}
                  onChange={(e) => updateBooking({ guest_phone: e.target.value })}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Notes (optional)</label>
                <textarea
                  value={booking.notes}
                  onChange={(e) => updateBooking({ notes: e.target.value })}
                  className="input"
                  rows={3}
                />
              </div>
            </div>
          </section>

          <section className="card p-6 bg-gradient-to-br from-sand to-cream">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{t('total.price')}</h2>
              <p className="text-4xl font-bold text-ocean">{currency} {calculateTotal()}</p>
            </div>
          </section>

          <button
            type="submit"
            disabled={!booking.hotel_id || !booking.room_id || !booking.check_in || !booking.check_out}
            className="btn-primary w-full py-4 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('confirm.booking')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
