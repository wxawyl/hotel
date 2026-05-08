import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookingContext } from '../contexts/BookingContext';
import { getHotelImage } from '../utils/imageGenerator';

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
              <div className="h-64 overflow-hidden bg-gradient-to-br from-sand to-gray-200">
                <img
                  src={hotel.mainImage || getHotelImage(hotel.id)}
                  alt={getLocaleText(hotel.name)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
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
