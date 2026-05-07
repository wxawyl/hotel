import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Bookings = () => {
  const { t } = useTranslation();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/bookings');
      setBookings(response.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/bookings/${id}/status`, { status });
      fetchBookings();
    } catch (err) {
      console.error('Error updating booking:', err);
    }
  };

  const exportCSV = () => {
    window.location.href = '/api/bookings/export/csv';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('bookings.title')}</h1>
        <button
          onClick={exportCSV}
          className="bg-ocean text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
        >
          {t('bookings.export')}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">{t('bookings.booking_number')}</th>
                <th className="px-6 py-3 text-left text-sm font-medium">{t('bookings.guest')}</th>
                <th className="px-6 py-3 text-left text-sm font-medium">{t('bookings.check_in')}</th>
                <th className="px-6 py-3 text-left text-sm font-medium">{t('bookings.check_out')}</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Total</th>
                <th className="px-6 py-3 text-left text-sm font-medium">{t('bookings.status')}</th>
                <th className="px-6 py-3 text-left text-sm font-medium">{t('bookings.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 font-medium">{booking.booking_number}</td>
                  <td className="px-6 py-4">
                    <div>{booking.guest_name}</div>
                    <div className="text-sm text-gray-500">{booking.guest_email}</div>
                  </td>
                  <td className="px-6 py-4">{booking.check_in}</td>
                  <td className="px-6 py-4">{booking.check_out}</td>
                  <td className="px-6 py-4">{booking.currency} {booking.total_price}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={booking.status}
                      onChange={(e) => updateStatus(booking.id, e.target.value)}
                      className="px-2 py-1 border rounded text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
