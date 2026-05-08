import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookingContext } from '../contexts/BookingContext';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { language, setLanguage, currency, setCurrency } = useContext(BookingContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'nav.home' },
    { path: '/hotels', label: 'nav.hotels' },
    { path: '/products', label: 'nav.products' },
    { path: '/book', label: 'nav.book' },
    { path: '/culture', label: 'nav.culture' },
    { path: '/contact', label: 'nav.contact' },
  ];

  const languages = [
    { code: 'en', name: 'EN' },
    { code: 'de', name: 'DE' },
    { code: 'ko', name: 'KO' },
    { code: 'ja', name: 'JA' },
    { code: 'zh', name: '中文' },
    { code: 'vi', name: 'VI' },
  ];

  const currencies = ['USD', 'VND'];

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold text-ocean">
            Hoi An Hotels
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  location.pathname === link.path
                    ? 'text-ocean font-medium'
                    : 'text-gray-600 hover:text-ocean'
                }`}
              >
                {t(link.label)}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <button className="text-gray-600 hover:text-ocean px-3 py-2 border rounded-lg">
                {language.toUpperCase()}
              </button>
              <div className="absolute right-0 mt-2 w-24 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      language === lang.code ? 'text-ocean font-medium' : 'text-gray-600'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative group">
              <button className="text-gray-600 hover:text-ocean px-3 py-2 border rounded-lg">
                {currency}
              </button>
              <div className="absolute right-0 mt-2 w-24 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {currencies.map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      currency === curr ? 'text-ocean font-medium' : 'text-gray-600'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 ${
                  location.pathname === link.path
                    ? 'text-ocean font-medium'
                    : 'text-gray-600'
                }`}
              >
                {t(link.label)}
              </Link>
            ))}
            <div className="pt-4 border-t flex space-x-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setIsMenuOpen(false);
                  }}
                  className={`px-3 py-1 rounded ${
                    language === lang.code ? 'bg-ocean text-white' : 'bg-gray-100'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {currencies.map((curr) => (
                <button
                  key={curr}
                  onClick={() => {
                    setCurrency(curr);
                    setIsMenuOpen(false);
                  }}
                  className={`px-3 py-1 rounded ${
                    currency === curr ? 'bg-ocean text-white' : 'bg-gray-100'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
