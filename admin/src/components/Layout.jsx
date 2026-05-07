import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../contexts/AuthContext';

const Layout = ({ children }) => {
  const { t, i18n } = useTranslation();
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const [language, setLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'EN' },
    { code: 'zh', name: '中文' },
    { code: 'vi', name: 'VI' },
  ];

  const navItems = [
    { path: '/', label: 'nav.dashboard' },
    { path: '/hotels', label: 'nav.hotels' },
    { path: '/rooms', label: 'nav.rooms' },
    { path: '/images', label: 'nav.images' },
    { path: '/bookings', label: 'nav.bookings' },
    { path: '/services', label: 'nav.services' },
    { path: '/settings', label: 'nav.settings' },
  ];

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-6">
          <h1 className="text-xl font-bold">Hotel Admin</h1>
        </div>
        <nav className="px-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block py-3 px-4 rounded-lg mb-2 transition ${
                location.pathname === item.path
                  ? 'bg-ocean text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              {t(item.label)}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
          <div className="relative group">
            <button className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition text-left">
              {language.toUpperCase()}
            </button>
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
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
          <button
            onClick={logout}
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg transition"
          >
            {t('nav.logout')}
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {t(navItems.find((item) => item.path === location.pathname)?.label || 'nav.dashboard')}
          </h2>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
