import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Images = () => {
  const { t } = useTranslation();
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState('');
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [uploading, setUploading] = useState(false);

  const categories = [
    'exterior',
    'interior',
    'room',
    'public',
    'breakfast',
    'banner',
    'cultural',
    'product',
  ];

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    if (selectedHotel) {
      fetchImages();
    }
  }, [selectedHotel, selectedCategory]);

  const fetchHotels = async () => {
    try {
      const response = await axios.get('/api/hotels');
      setHotels(response.data);
      if (response.data.length > 0) {
        setSelectedHotel(response.data[0].id);
      }
    } catch (err) {
      console.error('Error fetching hotels:', err);
    }
  };

  const fetchImages = async () => {
    try {
      let url = `/api/images/hotel/${selectedHotel}`;
      if (selectedCategory) {
        url += `?category=${selectedCategory}`;
      }
      const response = await axios.get(url);
      setImages(response.data);
    } catch (err) {
      console.error('Error fetching images:', err);
    }
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }
    formData.append('hotel_id', selectedHotel);
    if (selectedCategory) {
      formData.append('category', selectedCategory);
    }

    try {
      await axios.post('/api/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchImages();
    } catch (err) {
      console.error('Error uploading images:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateImage = async (id, updates) => {
    try {
      await axios.put(`/api/images/${id}`, updates);
      fetchImages();
    } catch (err) {
      console.error('Error updating image:', err);
    }
  };

  const handleDeleteImage = async (id) => {
    if (confirm('Are you sure?')) {
      try {
        await axios.delete(`/api/images/${id}`);
        fetchImages();
      } catch (err) {
        console.error('Error deleting image:', err);
      }
    }
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
      <h1 className="text-2xl font-bold mb-6">{t('images.title')}</h1>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-2">{t('images.hotel')}</label>
            <select
              value={selectedHotel}
              onChange={(e) => setSelectedHotel(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              {hotels.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {getText(hotel.name)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t('images.category')}</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t('images.upload')}</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            {image.thumbnail_url ? (
              <img
                src={image.thumbnail_url}
                alt=""
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-2">
                {t('images.category')}: {image.category || 'N/A'}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                {t('images.sort')}: {image.sort_order}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateImage(image.id, { is_hidden: !image.is_hidden })}
                  className={`text-sm ${image.is_hidden ? 'text-green-600' : 'text-orange-600'}`}
                >
                  {image.is_hidden ? t('images.visible') : 'Hide'}
                </button>
                <button
                  onClick={() => handleDeleteImage(image.id)}
                  className="text-sm text-red-600"
                >
                  {t('images.delete')}
                </button>
              </div>
              <div className="mt-2">
                <input
                  type="number"
                  value={image.sort_order || 0}
                  onChange={(e) => handleUpdateImage(image.id, { sort_order: parseInt(e.target.value) || 0 })}
                  className="w-full px-2 py-1 border rounded text-sm"
                  placeholder={t('images.sort')}
                />
              </div>
              <div className="mt-2">
                <select
                  value={image.category || ''}
                  onChange={(e) => handleUpdateImage(image.id, { category: e.target.value })}
                  className="w-full px-2 py-1 border rounded text-sm"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Images;
