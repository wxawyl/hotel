const express = require('express');
const router = express.Router();
const db = require('../config/database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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
  const category = req.query.category;
  let query = 'SELECT * FROM products';
  let params = [];
  
  if (category) {
    query += ' WHERE category = ?';
    params.push(category);
  }
  
  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ success: false, error: err.message });
    } else {
      res.json({ success: true, data: rows, count: rows.length });
    }
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ success: false, error: err.message });
    } else if (!row) {
      res.status(404).json({ success: false, message: 'Product not found' });
    } else {
      res.json({ success: true, data: row });
    }
  });
});

router.post('/', (req, res) => {
  const { name, name_locale, description, description_locale, price, category, image_url, stock } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({ success: false, message: 'Name and price are required' });
  }
  
  // 检查是否已存在同名商品
  db.get('SELECT id FROM products WHERE name = ?', [name], (err, existing) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    if (existing) {
      return res.status(400).json({ success: false, message: 'Product with this name already exists' });
    }
    
    // 插入新商品
    db.run(
      'INSERT INTO products (name, name_locale, description, description_locale, price, category, image_url, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, name_locale, description, description_locale, price, category, image_url, stock || 0],
      function(err) {
        if (err) {
          res.status(500).json({ success: false, error: err.message });
        } else {
          db.get('SELECT * FROM products WHERE id = ?', [this.lastID], (err, row) => {
            res.status(201).json({ success: true, data: row });
          });
        }
      }
    );
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { name, name_locale, description, description_locale, price, category, image_url, stock, stock_quantity } = req.body;
  
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, existing) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    let newName = name !== undefined ? name : existing.name;
    let newNameLocale = name_locale !== undefined ? name_locale : existing.name_locale;
    
    if (name !== undefined && name_locale === undefined) {
      try {
        const existingLocaleObj = typeof existing.name_locale === 'string' ? JSON.parse(existing.name_locale) : (existing.name_locale || {});
        const updatedLocaleObj = { ...existingLocaleObj, en: name };
        newNameLocale = JSON.stringify(updatedLocaleObj);
      } catch {
        newNameLocale = JSON.stringify({ en: name });
      }
    }
    
    if (name_locale !== undefined && name === undefined) {
      newName = name_locale;
    }
    
    let newDescription = description !== undefined ? description : existing.description;
    let newDescriptionLocale = description_locale !== undefined ? description_locale : existing.description_locale;
    
    if (description !== undefined && description_locale === undefined) {
      try {
        const existingLocaleObj = typeof existing.description_locale === 'string' ? JSON.parse(existing.description_locale) : (existing.description_locale || {});
        const updatedLocaleObj = { ...existingLocaleObj, en: description };
        newDescriptionLocale = JSON.stringify(updatedLocaleObj);
      } catch {
        newDescriptionLocale = JSON.stringify({ en: description });
      }
    }
    
    if (description_locale !== undefined && description === undefined) {
      newDescription = description_locale;
    }
    
    const newPrice = price !== undefined ? price : existing.price;
    const newCategory = category !== undefined ? category : existing.category;
    const newImageUrl = image_url !== undefined ? image_url : existing.image_url;
    const newStock = stock !== undefined ? stock : (stock_quantity !== undefined ? stock_quantity : existing.stock);
    
    db.run(
      'UPDATE products SET name = ?, name_locale = ?, description = ?, description_locale = ?, price = ?, category = ?, image_url = ?, stock = ?, stock_quantity = ? WHERE id = ?',
      [newName, newNameLocale, newDescription, newDescriptionLocale, newPrice, newCategory, newImageUrl, newStock, newStock, id],
      function(err) {
        if (err) {
          res.status(500).json({ success: false, error: err.message });
        } else if (this.changes === 0) {
          res.status(404).json({ success: false, message: 'Product not found' });
        } else {
          db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
            res.json({ success: true, data: row });
          });
        }
      }
    );
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  
  db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ success: false, error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ success: false, message: 'Product not found' });
    } else {
      res.json({ success: true, message: 'Product deleted successfully' });
    }
  });
});

router.post('/:id/upload-image', upload.single('image'), (req, res) => {
  const id = req.params.id;
  
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }
  
  const image_url = `/uploads/products/${req.file.filename}`;
  
  db.run(
    'UPDATE products SET image_url = ? WHERE id = ?',
    [image_url, id],
    function(err) {
      if (err) {
        res.status(500).json({ success: false, error: err.message });
      } else if (this.changes === 0) {
        res.status(404).json({ success: false, message: 'Product not found' });
      } else {
        db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
          res.json({ success: true, data: row, message: 'Image uploaded successfully' });
        });
      }
    }
  );
});

module.exports = router;