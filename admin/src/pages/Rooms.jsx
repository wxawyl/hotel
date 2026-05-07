import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Rooms = () => {
  const { t } = useTranslation();
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState('');
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    hotel_id: '',
    name: JSON.stringify({ en: '' }),
    description: JSON.stringify({ en: '' }),
    capacity: 2,
    area: 0,
    facilities: JSON.stringify([]),
    price: 0,
    is_active: 1,
  });

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    if (selectedHotel) {
      fetchRooms();
    }
  }, [selectedHotel]);

  const fetchHotels = async () => {
    try {
      const response = await axios.get('/api/hotels');
      setHotels(response.data);
      if (response.data.length > 0) {
        setSelectedHotel(response.data[0].id);
        setFormData({ ...formData, hotel_id: response.data[0].id });
      }
    } catch (err) {
      console.error('Error fetching hotels:', err);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`/api/rooms/hotel/${selectedHotel}`);
      setRooms(response.data);
    } catch (err) {
      console.error('Error fetching rooms:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`/api/rooms/${editing}`, formData);
      } else {
        await axios.post('/api/rooms', formData);
      }
      fetchRooms();
      resetForm();
    } catch (err) {
      console.error('Error saving room:', err);
    }
  };

  const handleEdit = (room) => {
    setEditing(room.id);
    setFormData({
      hotel_id: room.hotel_id,
      name: JSON.stringify(room.name),
      description: JSON.stringify(room.description),
      capacity: room.capacity,
      area: room.area,
      facilities: JSON.stringify(room.facilities),
      price: room.price,
      is_active: room.is_active,
    });
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      try {
        await axios.delete(`/api/rooms/${id}`);
        fetchRooms();
      } catch (err) {
        console.error('Error deleting room:', err);
      }
    }
  };

  const resetForm = () => {
    setEditing(null);
    setFormData({
      hotel_id: selectedHotel,
      name: JSON.stringify({ en: '' }),
      description: JSON.stringify({ en: '' }),
      capacity: 2,
      area: 0,
      facilities: JSON.stringify([]),
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
        <h1 className="text-2xl font-bold">{t('rooms.title')}</h1>
        <button
          onClick={resetForm}
          className="bg-ocean text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
        >
          {t('rooms.add')}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">{t('rooms.hotel')}</label>
            <select
              value={selectedHotel}
              onChange={(e) => {
                setSelectedHotel(e.target.value);
                setFormData({ ...formData, hotel_id: e.target.value });
              }}
              className="w-full px-4 py-2 border rounded-lg"
            >
              {hotels.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {getText(hotel.name)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4">{editing ? t('rooms.edit') : t('rooms.add')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t('rooms.name')} (JSON)</label>
              <textarea
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                rows={2}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t('rooms.description')} (JSON)</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                rows={2}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t('rooms.capacity')}</label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Area (m²)</label>
              <input
                type="number"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t('rooms.price')} (USD)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Facilities (JSON array)</label>
              <textarea
                value={formData.facilities}
                onChange={(e) => setFormData({ ...formData, facilities: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                rows={2}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button type="submit" className="bg-ocean text-white px-6 py-2 rounded-lg">
              {editing ? t('rooms.save') : t('rooms.save')}
            </button>
            {editing && (
              <button type="button" onClick={resetForm} className="border border-gray-300 px-6 py-2 rounded-lg">
                {t('rooms.cancel')}
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('rooms.name')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('rooms.capacity')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('rooms.price')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Active</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('rooms.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rooms.map((room) => (
              <tr key={room.id}>
                <td className="px-6 py-4">{getText(room.name)}</td>
                <td className="px-6 py-4">{room.capacity}</td>
                <td className="px-6 py-4">${room.price}</td>
                <td className="px-6 py-4">{room.is_active ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleEdit(room)} className="text-ocean mr-4">
                    {t('rooms.edit')}
                  </button>
                  <button onClick={() => handleDelete(room.id)} className="text-red-600">
                    {t('rooms.delete')}
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

export default Rooms;
