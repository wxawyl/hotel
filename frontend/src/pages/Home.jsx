import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookingContext } from '../contexts/BookingContext';
import { getHotelImage } from '../utils/imageGenerator';

const Home = () => {
  const { t } = useTranslation();
  const { hotels, getLocaleText } = useContext(BookingContext);

  return (
    <div>
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-ocean to-palm">
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&fit=crop" 
            alt="Luxury beach resort"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t('hero.title')}</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">{t('hero.subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/hotels" className="btn-primary text-lg px-8 py-4">
              {t('hotels.title')}
            </Link>
            <Link to="/book" className="btn-secondary bg-white text-ocean border-white hover:bg-transparent hover:text-white text-lg px-8 py-4">
              {t('book.now')}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{t('hotels.title')}</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            {t('home.hotels.desc')}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <Link key={hotel.id} to={`/hotel/${hotel.id}`} className="card group overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img
                    src={hotel.mainImage || getHotelImage(hotel.id)}
                    alt={getLocaleText(hotel.name)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-ocean transition-colors">
                    {getLocaleText(hotel.name)}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">{hotel.location}</p>
                  <span className="text-ocean text-sm font-medium flex items-center gap-1">
                    {t('learn.more')}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/hotels" className="btn-secondary inline-flex items-center gap-2">
              {t('view.all.hotels')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">{t('home.adventure.title')}</h2>
          <p className="text-gray-600 text-lg mb-8">{t('home.adventure.desc')}</p>
          <Link to="/book" className="btn-primary text-lg px-8 py-4 inline-block">
            {t('book.now')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
