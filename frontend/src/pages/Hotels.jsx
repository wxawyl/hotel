import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookingContext } from '../contexts/BookingContext';

const Hotels = () => {
  const { t } = useTranslation();
  const { hotels, getLocaleText } = useContext(BookingContext);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-12">{t('hotels.title')}</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <Link key={hotel.id} to={`/hotel/${hotel.id}`} className="card group">
              <div className="h-64 bg-gradient-to-br from-sand to-gray-200 flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p className="text-sm">Hotel Image</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-ocean transition-colors">
                  {getLocaleText(hotel.name)}
                </h3>
                <p className="text-gray-600 mb-4">{getLocaleText(hotel.description)}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.tags?.map((tag, idx) => (
                    <span key={idx} className="text-xs bg-sand text-ocean px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="btn-primary w-full">{t('view.details')}</button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hotels;
