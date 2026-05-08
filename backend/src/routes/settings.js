const express = require('express');
const db = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => {
  db.all('SELECT * FROM site_settings', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Database error' });
    }
    const settings = {};
    rows.forEach(row => {
      try {
        settings[row.key] = JSON.parse(row.value);
      } catch {
        settings[row.key] = row.value;
      }
    });
    res.json({ success: true, data: settings });
  });
});

router.get('/exchange-rates', (req, res) => {
  db.all('SELECT * FROM exchange_rates', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Database error' });
    }
    const rates = {};
    rows.forEach(row => {
      rates[row.currency] = row.rate_to_usd;
    });
    res.json({ success: true, data: rates });
  });
});

router.put('/exchange-rates', authenticateToken, (req, res) => {
  const { rates } = req.body;
  Object.entries(rates).forEach(([currency, rate]) => {
    db.run(
      'UPDATE exchange_rates SET rate_to_usd = ?, updated_at = CURRENT_TIMESTAMP WHERE currency = ?',
      [rate, currency]
    );
  });
  res.json({ success: true, message: 'Rates updated' });
});

router.put('/', authenticateToken, (req, res) => {
  const settings = req.body;
  Object.entries(settings).forEach(([key, value]) => {
    const valueStr = typeof value === 'object' ? JSON.stringify(value) : value;
    db.run(
      'INSERT OR REPLACE INTO site_settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)',
      [key, valueStr]
    );
  });
  res.json({ success: true, message: 'Settings updated' });
});

module.exports = router;
