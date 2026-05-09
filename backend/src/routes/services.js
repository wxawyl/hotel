const express = require('express');
const db = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => {
  db.all('SELECT * FROM services WHERE is_active = 1', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Database error' });
    }
    const services = rows.map(row => ({
      ...row,
      name: JSON.parse(row.name),
      description: JSON.parse(row.description)
    }));
    res.json({ success: true, data: services, count: services.length });
  });
});

router.post('/', authenticateToken, (req, res) => {
  const { name, description, price } = req.body;
  
  // 检查是否已存在同名服务
  db.get('SELECT id FROM services WHERE name = ?', [JSON.stringify(name)], (err, existing) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Database error' });
    }
    if (existing) {
      return res.status(400).json({ success: false, error: 'Service with this name already exists' });
    }
    
    // 插入新服务
    db.run(
      'INSERT INTO services (name, description, price) VALUES (?, ?, ?)',
      [JSON.stringify(name), JSON.stringify(description), price],
      function(err) {
        if (err) {
          return res.status(500).json({ success: false, error: 'Database error' });
        }
        res.json({ success: true, data: { id: this.lastID, ...req.body }, message: 'Service created' });
      }
    );
  });
});

router.put('/:id', authenticateToken, (req, res) => {
  const { name, description, price, is_active } = req.body;
  db.run(
    'UPDATE services SET name = ?, description = ?, price = ?, is_active = ? WHERE id = ?',
    [JSON.stringify(name), JSON.stringify(description), price, is_active, req.params.id],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, error: 'Database error' });
      }
      res.json({ success: true, message: 'Service updated' });
    }
  );
});

router.delete('/:id', authenticateToken, (req, res) => {
  db.run('UPDATE services SET is_active = 0 WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ success: false, error: 'Database error' });
    }
    res.json({ success: true, message: 'Service deleted' });
  });
});

module.exports = router;
