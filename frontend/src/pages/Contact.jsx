import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Contact = () => {
  const { t } = useTranslation();
  const [bookingNumber, setBookingNumber] = useState('');
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);

  const handleFindBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/bookings/find/${bookingNumber}`);
      setBooking(response.data);
      setError(null);
    } catch (err) {
      setBooking(null);
      setError(t('booking.not.found'));
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-12">{t('contact.title')}</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <section className="card p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">{t('find.booking')}</h2>
              <form onSubmit={handleFindBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{t('booking.number')}</label>
                  <input
                    type="text"
                    value={bookingNumber}
                    onChange={(e) => setBookingNumber(e.target.value)}
                    className="input"
                    placeholder={t('placeholder.booking')}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  {t('booking.find')}
                </button>
              </form>

              {error && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              {booking && (
                <div className="mt-4 p-6 bg-green-50 rounded-lg p-4">
                  <h3 className="font-bold mb-2">{t('booking.found')}</h3>
                  <p><strong>{t('booking.status')}:</strong> {booking.status}</p>
                  <p><strong>{t('check.in')}:</strong> {booking.check_in}</p>
                  <p><strong>{t('check.out')}:</strong> {booking.check_out}</p>
                  <p><strong>{t('total.price')}:</strong> {booking.currency} {booking.total_price}</p>
                </div>
              )}
            </section>

            <section className="card p-6">
              <h2 className="text-2xl font-bold mb-6">{t('contact.info')}</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-sand rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-ocean" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">{t('contact.email')}</p>
                    <p className="text-gray-600">info@hoianhotels.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-sand rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-ocean" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">{t('contact.phone')}</p>
                    <p className="text-gray-600">+84 123 456 789</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-sand rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-ocean" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.488-.492-.67-.5h-.572c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">{t('contact.whatsapp')}</p>
                    <a
                      href="https://wa.me/84123456789"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ocean hover:underline"
                    >
                      +84 123 456 789
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div>
            <section className="card p-6">
              <h2 className="text-2xl font-bold mb-6">{t('contact.location')}</h2>
              <div className="relative h-80 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=108.34469795227051%2C15.853593047082787%2C108.3500862121582%2C15.856646028268604&layer=mapnik"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className="w-full h-full"
                  title="Hoi An Map"
                ></iframe>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
                  <p className="font-medium">Hoi An Ancient Town</p>
                  <p className="text-sm text-gray-600">Quang Nam, Vietnam</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="font-medium">Hoi An Ancient Town, Quang Nam Province, Vietnam</p>
                <p className="text-gray-600 text-sm">{t('contact.location.desc')}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <a
                    href="https://www.google.com/maps/search/Hoi+An+Ancient+Town,+Quang+Nam,+Vietnam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-sm px-4 py-2 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Google Maps
                  </a>
                  <a
                    href="https://www.openstreetmap.org/search?query=Hoi%20An%20Ancient%20Town%2C%20Quang%20Nam%2C%20Vietnam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-sm px-4 py-2 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    OpenStreetMap
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;