import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Dashboard = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    hotels: 0,
    rooms: 0,
    bookings: 0,
    services: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [hotelsRes, bookingsRes, servicesRes] = await Promise.all([
        axios.get('/api/hotels'),
        axios.get('/api/bookings'),
        axios.get('/api/services'),
      ]);
      setStats({
        hotels: (hotelsRes.data.data || hotelsRes.data).length,
        rooms: 0,
        bookings: (bookingsRes.data.data || bookingsRes.data).length,
        services: (servicesRes.data.data || servicesRes.data).length,
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const statCards = [
    { label: 'dashboard.totalHotels', value: stats.hotels, color: 'bg-ocean' },
    { label: 'dashboard.totalBookings', value: stats.bookings, color: 'bg-palm' },
    { label: 'services.title', value: stats.services, color: 'bg-coral' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t('dashboard.title')}</h1>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => (
          <div key={stat.label} className={`${stat.color} text-white p-6 rounded-xl shadow-lg`}>
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-lg opacity-90">{t(stat.label)}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">{t('dashboard.stats')}</h2>
        <p className="text-gray-600">
          {t('dashboard.stats')}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
