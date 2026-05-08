import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { BookingContext } from '../contexts/BookingContext';
import { getHotelImage, getRoomImage } from '../utils/imageGenerator';
import Modal from '../components/Modal';

const HotelDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { getLocaleText, updateBooking, currency, convertPrice } = useContext(BookingContext);
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);

  useEffect(() => {
    fetchHotel();
    fetchRooms();
    fetchImages();
  }, [id]);

  const fetchHotel = async () => {
    try {
      const response = await axios.get(`/api/hotels/${id}`);
      if (response.data.success) {
        setHotel(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching hotel:', error);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`/api/rooms/hotel/${id}`);
      if (response.data.success) {
        setRooms(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get(`/api/images/hotel/${id}`);
      if (response.data.success) {
        setImages(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const openRoomDetails = (room) => {
    setSelectedRoom(room);
    setIsRoomModalOpen(true);
  };

  useEffect(() => {
    fetchHotel();
    fetchRooms();
    fetchImages();
  }, [id]);

  if (!hotel) return <div className="pt-24 text-center">Loading...</div>;

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{getLocaleText(hotel.name)}</h1>
          <p className="text-gray-600 text-lg">{getLocaleText(hotel.description)}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {images.length > 0 ? (
            images.map((image, idx) => (
              <div key={image.id} className="h-48 bg-gradient-to-br from-sand to-gray-200 rounded-lg overflow-hidden">
                <img
                  src={image.url}
                  alt={`Hotel ${hotel.id}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            [0, 1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gradient-to-br from-sand to-gray-200 rounded-lg overflow-hidden">
                <img
                  src={getHotelImage(parseInt(id), i)}
                  alt={`Hotel ${hotel.id} ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {hotel.tags?.map((tag, idx) => (
            <span key={idx} className="bg-sand text-ocean px-4 py-2 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t('hotel.detail.rooms')}</h2>
          <div className="space-y-6">
            {rooms.map((room) => (
              <div key={room.id} className="card p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div 
                    className="w-full md:w-48 h-32 overflow-hidden rounded-lg bg-gradient-to-br from-sand to-gray-200 cursor-pointer"
                    onClick={() => openRoomDetails(room)}
                  >
                    <img
                      src={getRoomImage(room.id)}
                      alt={getLocaleText(room.name)}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold mb-2">{getLocaleText(room.name)}</h3>
                      <button
                        onClick={() => openRoomDetails(room)}
                        className="text-ocean text-sm hover:underline flex items-center gap-1"
                      >
                        {t('view.details')}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-gray-600 mb-2">{getLocaleText(room.description)}</p>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>👥 {room.capacity} guests</span>
                      <span>📐 {room.area} m²</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {room.facilities?.slice(0, 4).map((facility, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-ocean mb-4">
                      {currency} {convertPrice(room.price)}
                      <span className="text-sm font-normal text-gray-500">/night</span>
                    </p>
                    <Link
                      to="/book"
                      onClick={() => updateBooking({ hotel_id: hotel.id, rooms: [{ ...room, quantity: 1 }] })}
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

        <Modal
          isOpen={isRoomModalOpen}
          onClose={() => setIsRoomModalOpen(false)}
          title={selectedRoom ? getLocaleText(selectedRoom.name) : ''}
          size="xl"
        >
          {selectedRoom && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={getRoomImage(selectedRoom.id)}
                    alt={getLocaleText(selectedRoom.name)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=450&fit=crop"
                    alt={getLocaleText(selectedRoom.name)}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-3">{t('description')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {getLocaleText(selectedRoom.description)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-sand/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-ocean mb-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="font-medium">{t('max.guests')}</span>
                  </div>
                  <p className="text-2xl font-bold">{selectedRoom.capacity}</p>
                </div>
                <div className="bg-sand/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-ocean mb-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                    </svg>
                    <span className="font-medium">{t('area')}</span>
                  </div>
                  <p className="text-2xl font-bold">{selectedRoom.area} m²</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-3">{t('facilities')}</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRoom.facilities?.map((facility, idx) => (
                    <span key={idx} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full">
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-ocean/10 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{t('price')}</span>
                  <span className="text-2xl font-bold text-ocean">
                    {currency} {convertPrice(selectedRoom.price)}
                    <span className="text-sm font-normal text-gray-500 ml-1">/night</span>
                  </span>
                </div>
              </div>
              <Link
                to="/book"
                onClick={() => {
                  updateBooking({ hotel_id: hotel.id, rooms: [{ ...selectedRoom, quantity: 1 }] });
                  setIsRoomModalOpen(false);
                }}
                className="btn-primary w-full"
              >
                {t('book.now')}
              </Link>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default HotelDetail;
