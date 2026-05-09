const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => {
  db.all('SELECT * FROM hotels WHERE is_active = 1', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Database error' });
    }
    const hotels = rows.map(row => ({
      ...row,
      name: JSON.parse(row.name),
      description: JSON.parse(row.description),
      tags: JSON.parse(row.tags),
      distance_info: JSON.parse(row.distance_info)
    }));
    res.json({ success: true, data: hotels, count: hotels.length });
  });
});

router.get('/:id', (req, res) => {
  db.get('SELECT * FROM hotels WHERE id = ?', [req.params.id], (err, hotel) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Database error' });
    }
    if (!hotel) {
      return res.status(404).json({ success: false, error: 'Hotel not found' });
    }
    res.json({
      success: true,
      data: {
        ...hotel,
        name: JSON.parse(hotel.name),
        description: JSON.parse(hotel.description),
        tags: JSON.parse(hotel.tags),
        distance_info: JSON.parse(hotel.distance_info)
      }
    });
  });
});

router.post('/', authenticateToken, [
  body('name').isObject().withMessage('Name must be an object'),
  body('location').notEmpty().withMessage('Location is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, error: errors.array()[0].msg });
  }
  
  const { name, description, location, tags, distance_info } = req.body;
  
  // 检查是否已存在同名酒店
  db.get('SELECT id FROM hotels WHERE name = ?', [JSON.stringify(name)], (err, existing) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Database error' });
    }
    if (existing) {
      return res.status(400).json({ success: false, error: 'Hotel with this name already exists' });
    }
    
    // 插入新酒店
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
          return res.status(500).json({ success: false, error: 'Database error' });
        }
        res.json({ success: true, data: { id: this.lastID, ...req.body }, message: 'Hotel created' });
      }
    );
  });
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
        return res.status(500).json({ success: false, error: 'Database error' });
      }
      res.json({ success: true, message: 'Hotel updated' });
    }
  );
});

router.delete('/:id', authenticateToken, (req, res) => {
  db.run('UPDATE hotels SET is_active = 0 WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ success: false, error: 'Database error' });
    }
    res.json({ success: true, message: 'Hotel deleted' });
  });
});

module.exports = router;
