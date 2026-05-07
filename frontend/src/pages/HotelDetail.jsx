import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { BookingContext } from '../contexts/BookingContext';

const HotelDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { getLocaleText, updateBooking, currency, convertPrice } = useContext(BookingContext);
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchHotel();
    fetchRooms();
    fetchImages();
  }, [id]);

  const fetchHotel = async () => {
    try {
      const response = await axios.get(`/api/hotels`);
      const found = response.data.find(h => h.id === parseInt(id));
      setHotel(found);
    } catch (error) {
      console.error('Error fetching hotel:', error);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`/api/rooms/hotel/${id}`);
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get(`/api/images/hotel/${id}`);
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  if (!hotel) return <div className="pt-24 text-center">Loading...</div>;

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{getLocaleText(hotel.name)}</h1>
          <p className="text-gray-600 text-lg">{getLocaleText(hotel.description)}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-gradient-to-br from-sand to-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Image {i}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {hotel.tags?.map((tag, idx) => (
            <span key={idx} className="bg-sand text-ocean px-4 py-2 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Available Rooms</h2>
          <div className="space-y-6">
            {rooms.map((room) => (
              <div key={room.id} className="card p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{getLocaleText(room.name)}</h3>
                    <p className="text-gray-600 mb-2">{getLocaleText(room.description)}</p>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>👥 {room.capacity} guests</span>
                      <span>📐 {room.area} m²</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-ocean mb-4">
                      {currency} {convertPrice(room.price)}
                      <span className="text-sm font-normal text-gray-500">/night</span>
                    </p>
                    <Link
                      to="/book"
                      onClick={() => updateBooking({ hotel_id: hotel.id, room_id: room.id })}
                      className="btn-primary"
                    >
                      {t('book.now')}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HotelDetail;
