const express = require('express');
const crypto = require('crypto');
const db = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

const generateBookingNumber = () => {
  return 'BK' + Date.now().toString(36).toUpperCase() + crypto.randomBytes(2).toString('hex').toUpperCase();
};

router.post('/', (req, res) => {
  const {
    hotel_id, room_id, check_in, check_out, guest_name, guest_email, guest_phone, services, total_price, currency, notes } = req.body;
  const booking_number = generateBookingNumber();

  db.run(
    `INSERT INTO bookings (booking_number, hotel_id, room_id, check_in, check_out, guest_name, guest_email, guest_phone, services, total_price, currency, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [booking_number, hotel_id, room_id, check_in, check_out, guest_name, guest_email, guest_phone, JSON.stringify(services), total_price, currency, notes],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ booking_number, id: this.lastID });
    }
  );
});

router.get('/find/:bookingNumber', (req, res) => {
  db.get('SELECT * FROM bookings WHERE booking_number = ?', [req.params.bookingNumber], (err, booking) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json({
      ...booking,
      services: JSON.parse(booking.services)
    });
  });
});

router.get('/', authenticateToken, (req, res) => {
  db.all('SELECT * FROM bookings ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    const bookings = rows.map(row => ({
      ...row,
      services: JSON.parse(row.services)
    }));
    res.json(bookings);
  });
});

router.put('/:id/status', authenticateToken, (req, res) => {
  const { status } = req.body;
  db.run('UPDATE bookings SET status = ? WHERE id = ?', [status, req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Booking status updated' });
  });
});

router.get('/export/csv', authenticateToken, (req, res) => {
  db.all('SELECT * FROM bookings ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    const headers = ['ID', 'Booking Number', 'Hotel', 'Room', 'Check In', 'Check Out', 'Guest', 'Email', 'Phone', 'Total', 'Currency', 'Status', 'Created'];
    const csv = [
      headers.join(','),
      ...rows.map(row => [
        row.id,
        row.booking_number,
        row.hotel_id,
        row.room_id,
        row.check_in,
        row.check_out,
        `"${row.guest_name}"`,
        row.guest_email,
        row.guest_phone,
        row.total_price,
        row.currency,
        row.status,
        row.created_at
      ].join(','))
    ].join('\n');
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="bookings.csv"');
    res.send(csv);
  });
});

module.exports = router;
