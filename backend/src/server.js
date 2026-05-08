require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

if (!process.env.JWT_SECRET) {
  console.error('ERROR: JWT_SECRET environment variable is not set');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

const { errorHandler, notFound } = require('./middleware/errorHandler');

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://your-domain.com', 'https://www.your-domain.com', 'https://*.vercel.app']
  : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const frontendPath = path.join(__dirname, '../../frontend/dist');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(frontendPath));
}

app.use('/api/auth', require('./routes/auth'));
app.use('/api/hotels', require('./routes/hotels'));
app.use('/api/rooms', require('./routes/rooms'));
app.use('/api/images', require('./routes/images'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/services', require('./routes/services'));
app.use('/api/products', require('./routes/products'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/chatbot', require('./routes/chatbot'));

app.get('/api/health', (req, res) => {
  res.json({ success: true, data: { status: 'ok' } });
});

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
