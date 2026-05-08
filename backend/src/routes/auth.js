const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');

const router = express.Router();

router.post('/login', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, error: errors.array()[0].msg });
  }
  const { username, password } = req.body;

  db.get('SELECT * FROM admin_users WHERE username = ?', [username], (err, user) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Database error' });
    }
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '24h' }
      );

      res.json({ success: true, data: { token, user: { id: user.id, username: user.username } } });
    });
  });
});

module.exports = router;
