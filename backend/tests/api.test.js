const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());

const { errorHandler, notFound } = require('../src/middleware/errorHandler');
app.use('/api/hotels', require('../src/routes/hotels'));
app.use('/api/rooms', require('../src/routes/rooms'));
app.use('/api/services', require('../src/routes/services'));
app.use('/api/bookings', require('../src/routes/bookings'));
app.use('/api/auth', require('../src/routes/auth'));
app.use('/api/settings', require('../src/routes/settings'));
app.use(notFound);
app.use(errorHandler);

const generateToken = () => {
  return jwt.sign({ id: 1, username: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

describe('API Tests', () => {
  describe('Auth API', () => {
    it('should return error for missing username', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ password: 'test' });
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should return error for missing password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'test' });
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should return error for invalid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'nonexistent', password: 'wrong' });
      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Hotels API', () => {
    it('should return hotels with correct response format', async () => {
      const res = await request(app).get('/api/hotels');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(typeof res.body.count).toBe('number');
    });

    it('should require authentication for create hotel', async () => {
      const res = await request(app)
        .post('/api/hotels')
        .send({ name: { en: 'Test Hotel' }, location: 'Test Location' });
      expect(res.statusCode).toBe(401);
    });

    it('should create hotel with valid token', async () => {
      const token = generateToken();
      const res = await request(app)
        .post('/api/hotels')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: { en: 'Test Hotel' }, location: 'Test Location' });
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Hotel created');
    });
  });

  describe('Rooms API', () => {
    it('should return rooms with correct response format', async () => {
      const res = await request(app).get('/api/rooms/hotel/1');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('Services API', () => {
    it('should return services with correct response format', async () => {
      const res = await request(app).get('/api/services');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('Bookings API', () => {
    it('should return error for missing fields', async () => {
      const res = await request(app)
        .post('/api/bookings')
        .send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should validate email format', async () => {
      const res = await request(app)
        .post('/api/bookings')
        .send({
          hotel_id: 1,
          room_id: 1,
          check_in: '2024-01-01',
          check_out: '2024-01-02',
          guest_name: 'Test',
          guest_email: 'invalid-email',
          guest_phone: '123',
          total_price: 100
        });
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Settings API', () => {
    it('should return settings with correct response format', async () => {
      const res = await request(app).get('/api/settings');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('should return exchange rates with correct response format', async () => {
      const res = await request(app).get('/api/settings/exchange-rates');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for non-existent endpoint', async () => {
      const res = await request(app).get('/api/nonexistent');
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});