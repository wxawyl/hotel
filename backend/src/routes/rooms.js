const express = require('express');
const db = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/hotel/:hotelId', (req, res) => {
  db.all('SELECT * FROM rooms WHERE hotel_id = ? AND is_active = 1', [req.params.hotelId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    const rooms = rows.map(row => ({
      ...row,
      name: JSON.parse(row.name),
      description: JSON.parse(row.description),
      facilities: JSON.parse(row.facilities)
    }));
    res.json(rooms);
  });
});

router.post('/', authenticateToken, (req, res) => {
  const { hotel_id, name, description, capacity, area, facilities, price } = req.body;
  db.run(
    'INSERT INTO rooms (hotel_id, name, description, capacity, area, facilities, price) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [hotel_id, JSON.stringify(name), JSON.stringify(description), capacity, area, JSON.stringify(facilities), price],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ id: this.lastID, ...req.body });
    }
  );
});

router.put('/:id', authenticateToken, (req, res) => {
  const { name, description, capacity, area, facilities, price, is_active } = req.body;
  db.run(
    'UPDATE rooms SET name = ?, description = ?, capacity = ?, area = ?, facilities = ?, price = ?, is_active = ? WHERE id = ?',
    [JSON.stringify(name), JSON.stringify(description), capacity, area, JSON.stringify(facilities), price, is_active, req.params.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Room updated' });
    }
  );
});

router.delete('/:id', authenticateToken, (req, res) => {
  db.run('UPDATE rooms SET is_active = 0 WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Room deleted' });
  });
});

module.exports = router;
