const express = require('express');
const db = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => {
  db.all('SELECT * FROM hotels WHERE is_active = 1', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    const hotels = rows.map(row => ({
      ...row,
      name: JSON.parse(row.name),
      description: JSON.parse(row.description),
      tags: JSON.parse(row.tags),
      distance_info: JSON.parse(row.distance_info)
    }));
    res.json(hotels);
  });
});

router.get('/:id', (req, res) => {
  db.get('SELECT * FROM hotels WHERE id = ?', [req.params.id], (err, hotel) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    res.json({
      ...hotel,
      name: JSON.parse(hotel.name),
      description: JSON.parse(hotel.description),
      tags: JSON.parse(hotel.tags),
      distance_info: JSON.parse(hotel.distance_info)
    });
  });
});

router.post('/', authenticateToken, (req, res) => {
  const { name, description, location, tags, distance_info } = req.body;
  db.run(
    'INSERT INTO hotels (name, description, location, tags, distance_info) VALUES (?, ?, ?, ?, ?)',
    [
      JSON.stringify(name),
      JSON.stringify(description),
      location,
      JSON.stringify(tags),
      JSON.stringify(distance_info)
    ],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ id: this.lastID, ...req.body });
    }
  );
});

router.put('/:id', authenticateToken, (req, res) => {
  const { name, description, location, tags, distance_info, is_active } = req.body;
  db.run(
    'UPDATE hotels SET name = ?, description = ?, location = ?, tags = ?, distance_info = ?, is_active = ? WHERE id = ?',
    [
      JSON.stringify(name),
      JSON.stringify(description),
      location,
      JSON.stringify(tags),
      JSON.stringify(distance_info),
      is_active,
      req.params.id
    ],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ message: 'Hotel updated' });
    }
  );
});

router.delete('/:id', authenticateToken, (req, res) => {
  db.run('UPDATE hotels SET is_active = 0 WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Hotel deleted' });
  });
});

module.exports = router;
