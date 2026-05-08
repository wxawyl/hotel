const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const db = new sqlite3.Database('./database/hotel.db');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = './uploads/products';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  }
});

router.get('/', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(row);
  });
});

router.post('/', upload.single('image'), (req, res) => {
  const { name, price, description } = req.body;
  const image_url = req.file ? `/uploads/products/${req.file.filename}` : null;
  
  db.run(
    'INSERT INTO products (name, price, description, image_url) VALUES (?, ?, ?, ?)',
    [name, price, description, image_url],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        id: this.lastID,
        name,
        price,
        description,
        image_url
      });
    }
  );
});

router.put('/:id', upload.single('image'), (req, res) => {
  const { name, price, description, stock_quantity } = req.body;
  
  if (req.file) {
    const image_url = `/uploads/products/${req.file.filename}`;
    db.get('SELECT name, price, description, stock_quantity FROM products WHERE id = ?', [req.params.id], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      const newName = name || row.name;
      const newPrice = price !== undefined ? price : row.price;
      const newDescription = description || row.description;
      const newStock = stock_quantity !== undefined ? stock_quantity : row.stock_quantity;
      
      db.run(
        'UPDATE products SET name = ?, price = ?, description = ?, image_url = ?, stock_quantity = ? WHERE id = ?',
        [newName, newPrice, newDescription, image_url, newStock, req.params.id],
        function(err) {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.json({ message: 'Product updated', changes: this.changes });
        }
      );
    });
  } else if (stock_quantity !== undefined) {
    db.run(
      'UPDATE products SET stock_quantity = ? WHERE id = ?',
      [stock_quantity, req.params.id],
      function(err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ message: 'Product updated', changes: this.changes });
      }
    );
  } else {
    db.get('SELECT name, price, description FROM products WHERE id = ?', [req.params.id], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      const newName = name || row.name;
      const newPrice = price !== undefined ? price : row.price;
      const newDescription = description || row.description;
      
      db.run(
        'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?',
        [newName, newPrice, newDescription, req.params.id],
        function(err) {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.json({ message: 'Product updated', changes: this.changes });
        }
      );
    });
  }
});

router.delete('/:id', (req, res) => {
  db.run('DELETE FROM products WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Product deleted', changes: this.changes });
  });
});

router.post('/:id/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const image_url = `/uploads/products/${req.file.filename}`;
  
  db.run(
    'UPDATE products SET image_url = ? WHERE id = ?',
    [image_url, req.params.id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ 
        message: 'Image uploaded successfully', 
        image_url: `http://localhost:5000${image_url}`,
        changes: this.changes 
      });
    }
  );
});

module.exports = router;
