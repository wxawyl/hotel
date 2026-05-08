import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Settings = () => {
  const { t } = useTranslation();
  const [settings, setSettings] = useState({});
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    fetchSettings();
    fetchExchangeRates();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/api/settings');
      const settingsData = response.data.data || response.data;
      const settingsObj = {};
      if (Array.isArray(settingsData)) {
        settingsData.forEach(s => {
          try {
            settingsObj[s.key] = JSON.parse(s.value);
          } catch {
            settingsObj[s.key] = s.value;
          }
        });
      } else {
        Object.entries(settingsData).forEach(([key, value]) => {
          settingsObj[key] = value;
        });
      }
      setSettings(settingsObj);
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  };

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get('/api/settings/exchange-rates');
      setExchangeRates(response.data.data || response.data);
    } catch (err) {
      console.error('Error fetching exchange rates:', err);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/settings', settings);
      alert('Settings saved successfully!');
    } catch (err) {
      console.error('Error saving settings:', err);
    }
  };

  const handleSaveRates = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/settings/exchange-rates', { rates: exchangeRates });
      alert('Exchange rates saved successfully!');
    } catch (err) {
      console.error('Error saving rates:', err);
    }
  };

  const updateSetting = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const updateRate = (currency, rate) => {
    setExchangeRates({ ...exchangeRates, [currency]: parseFloat(rate) });
  };

  const formatValue = (value) => {
    if (typeof value === 'object') {
      return JSON.stringify(value, null, 2);
    }
    return value || '';
  };

  const parseValue = (value) => {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t('settings.title')}</h1>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">{t('settings.siteSettings')}</h2>
        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">{t('settings.siteName')} (JSON)</label>
            <textarea
              value={formatValue(settings.site_name)}
              onChange={(e) => updateSetting('site_name', parseValue(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t('settings.contactEmail')}</label>
            <input
              type="email"
              value={settings.contact_email || ''}
              onChange={(e) => updateSetting('contact_email', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t('settings.contactPhone')}</label>
            <input
              type="text"
              value={settings.contact_phone || ''}
              onChange={(e) => updateSetting('contact_phone', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t('settings.whatsapp')}</label>
            <input
              type="text"
              value={settings.whatsapp || ''}
              onChange={(e) => updateSetting('whatsapp', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <button type="submit" className="bg-ocean text-white px-6 py-2 rounded-lg">
            {t('settings.saveSettings')}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">{t('settings.exchangeRates')}</h2>
        <form onSubmit={handleSaveRates} className="space-y-4">
          {Object.entries(exchangeRates).map(([currency, rate]) => (
            <div key={currency} className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">{currency}</label>
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => updateRate(currency, e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  step="0.0001"
                />
              </div>
            </div>
          ))}
          <button type="submit" className="bg-ocean text-white px-6 py-2 rounded-lg">
            {t('settings.saveRates')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
