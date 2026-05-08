import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../contexts/AuthContext';

const Layout = ({ children }) => {
  const { t, i18n } = useTranslation();
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const [language, setLanguage] = useState('en');
  const [showLangMenu, setShowLangMenu] = useState(false);

  const languages = [
    { code: 'en', name: 'EN' },
    { code: 'zh', name: '中文' },
    { code: 'vi', name: 'VI' },
  ];

  const navItems = [
    { path: '/', label: 'nav.dashboard' },
    { path: '/hotels', label: 'nav.hotels' },
    { path: '/rooms', label: 'nav.rooms' },
    { path: '/products', label: 'nav.products' },
    { path: '/images', label: 'nav.images' },
    { path: '/bookings', label: 'nav.bookings' },
    { path: '/services', label: 'nav.services' },
    { path: '/settings', label: 'nav.settings' },
  ];

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    setShowLangMenu(false);
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
      </aside>
      <main className="flex-1 overflow-auto flex flex-col">
        <header className="bg-white shadow-sm px-6 py-3 flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {t(navItems.find((item) => item.path === location.pathname)?.label || 'nav.dashboard')}
          </h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition flex items-center gap-1"
              >
                <span>{language.toUpperCase()}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showLangMenu && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border py-1 z-50 min-w-[80px]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`block w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 ${
                        language === lang.code ? 'text-ocean font-medium' : 'text-gray-600'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={logout}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-lg transition"
              title={t('nav.logout')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </header>
        <div className="flex-1 p-6 overflow-auto">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
