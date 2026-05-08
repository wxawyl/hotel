import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Hotels = () => {
  const { t } = useTranslation();
  const [hotels, setHotels] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: JSON.stringify({ en: '' }),
    description: JSON.stringify({ en: '' }),
    location: '',
    tags: JSON.stringify([]),
    distance_info: JSON.stringify({ en: '' }),
    is_active: 1,
  });

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get('/api/hotels');
      setHotels(response.data.data || response.data);
    } catch (err) {
      console.error('Error fetching hotels:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`/api/hotels/${editing}`, formData);
      } else {
        await axios.post('/api/hotels', formData);
      }
      fetchHotels();
      resetForm();
    } catch (err) {
      console.error('Error saving hotel:', err);
    }
  };

  const handleEdit = (hotel) => {
    setEditing(hotel.id);
    setFormData({
      name: JSON.stringify(hotel.name),
      description: JSON.stringify(hotel.description),
      location: hotel.location,
      tags: JSON.stringify(hotel.tags),
      distance_info: JSON.stringify(hotel.distance_info),
      is_active: hotel.is_active,
    });
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      try {
        await axios.delete(`/api/hotels/${id}`);
        fetchHotels();
      } catch (err) {
        console.error('Error deleting hotel:', err);
      }
    }
  };

  const resetForm = () => {
    setEditing(null);
    setFormData({
      name: JSON.stringify({ en: '' }),
      description: JSON.stringify({ en: '' }),
      location: '',
      tags: JSON.stringify([]),
      distance_info: JSON.stringify({ en: '' }),
      is_active: 1,
    });
  };

  const getText = (obj) => {
    if (typeof obj === 'string') {
      try {
        const parsed = JSON.parse(obj);
        return parsed.en || Object.values(parsed)[0] || '';
      } catch {
        return obj;
      }
    }
    return obj?.en || Object.values(obj)[0] || '';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('hotels.title')}</h1>
        <button
          onClick={resetForm}
          className="bg-ocean text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
        >
          {t('hotels.add')}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">{editing ? t('hotels.edit') : t('hotels.add')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">{t('hotels.name')} (JSON)</label>
            <textarea
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              rows={2}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t('hotels.description')} (JSON)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t('hotels.location')}</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tags (JSON array)</label>
            <textarea
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Distance Info (JSON)</label>
            <textarea
              value={formData.distance_info}
              onChange={(e) => setFormData({ ...formData, distance_info: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              rows={2}
            />
          </div>
          <div className="flex gap-4">
            <button type="submit" className="bg-ocean text-white px-6 py-2 rounded-lg">
              {editing ? t('hotels.save') : t('hotels.save')}
            </button>
            {editing && (
              <button type="button" onClick={resetForm} className="border border-gray-300 px-6 py-2 rounded-lg">
                {t('hotels.cancel')}
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('hotels.name')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('hotels.location')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Active</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('hotels.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {hotels.map((hotel) => (
              <tr key={hotel.id}>
                <td className="px-6 py-4">{getText(hotel.name)}</td>
                <td className="px-6 py-4">{hotel.location}</td>
                <td className="px-6 py-4">{hotel.is_active ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleEdit(hotel)} className="text-ocean mr-4">
                    {t('hotels.edit')}
                  </button>
                  <button onClick={() => handleDelete(hotel.id)} className="text-red-600">
                    {t('hotels.delete')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hotels;
