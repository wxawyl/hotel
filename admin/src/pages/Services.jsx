import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Services = () => {
  const { t } = useTranslation();
  const [services, setServices] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: JSON.stringify({ en: '' }),
    description: JSON.stringify({ en: '' }),
    price: 0,
    is_active: 1,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services');
      setServices(response.data.data || response.data);
    } catch (err) {
      console.error('Error fetching services:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`/api/services/${editing}`, formData);
      } else {
        await axios.post('/api/services', formData);
      }
      fetchServices();
      resetForm();
    } catch (err) {
      console.error('Error saving service:', err);
    }
  };

  const handleEdit = (service) => {
    setEditing(service.id);
    setFormData({
      name: JSON.stringify(service.name),
      description: JSON.stringify(service.description),
      price: service.price,
      is_active: service.is_active,
    });
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      try {
        await axios.delete(`/api/services/${id}`);
        fetchServices();
      } catch (err) {
        console.error('Error deleting service:', err);
      }
    }
  };

  const resetForm = () => {
    setEditing(null);
    setFormData({
      name: JSON.stringify({ en: '' }),
      description: JSON.stringify({ en: '' }),
      price: 0,
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
        <h1 className="text-2xl font-bold">{t('services.title')}</h1>
        <button
          onClick={resetForm}
          className="bg-ocean text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
        >
          {t('services.add')}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">{editing ? t('services.edit') : t('services.add')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">{t('services.name')} (JSON)</label>
            <textarea
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              rows={2}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t('services.description')} (JSON)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t('services.price')} (USD)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg"
              step="0.01"
              required
            />
          </div>
          <div className="flex gap-4">
            <button type="submit" className="bg-ocean text-white px-6 py-2 rounded-lg">
              {editing ? t('services.save') : t('services.save')}
            </button>
            {editing && (
              <button type="button" onClick={resetForm} className="border border-gray-300 px-6 py-2 rounded-lg">
                {t('services.cancel')}
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('services.name')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('services.price')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Active</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('services.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {services.map((service) => (
              <tr key={service.id}>
                <td className="px-6 py-4">{getText(service.name)}</td>
                <td className="px-6 py-4">${service.price}</td>
                <td className="px-6 py-4">{service.is_active ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleEdit(service)} className="text-ocean mr-4">
                    {t('services.edit')}
                  </button>
                  <button onClick={() => handleDelete(service.id)} className="text-red-600">
                    {t('services.delete')}
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

export default Services;
