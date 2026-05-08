const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const db = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  }
});

const processImage = async (filePath, filename) => {
  const webpPath = path.join(uploadDir, `${filename}.webp`);
  const thumbPath = path.join(uploadDir, `${filename}-thumb.webp`);
  
  await sharp(filePath)
    .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(webpPath);
  
  await sharp(filePath)
    .resize(400, 400, { fit: 'cover' })
    .webp({ quality: 80 })
    .toFile(thumbPath);
  
  fs.unlinkSync(filePath);
  
  return {
    url: `/uploads/${filename}.webp`,
    thumbnailUrl: `/uploads/${filename}-thumb.webp`
  };
};

router.get('/hotel/:hotelId', (req, res) => {
  const { category } = req.query;
  let query = 'SELECT * FROM images WHERE hotel_id = ? AND is_hidden = 0';
  const params = [req.params.hotelId];
  
  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }
  
  query += ' ORDER BY sort_order ASC';
  
  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Database error' });
    }
    res.json({ success: true, data: rows, count: rows.length });
  });
});

router.get('/room/:roomId', (req, res) => {
  db.all('SELECT * FROM images WHERE room_id = ? AND is_hidden = 0 ORDER BY sort_order ASC', 
    [req.params.roomId], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Database error' });
    }
    res.json({ success: true, data: rows, count: rows.length });
  });
});

router.post('/upload', authenticateToken, upload.array('images', 20), async (req, res) => {
  try {
    const { hotel_id, room_id, category } = req.body;
    const results = [];
    
    for (const file of req.files) {
      const filename = path.parse(file.filename).name;
      const processed = await processImage(file.path, filename);
      
      db.run(
        'INSERT INTO images (hotel_id, room_id, category, url, thumbnail_url) VALUES (?, ?, ?, ?, ?)',
        [hotel_id || null, room_id || null, category, processed.url, processed.thumbnailUrl],
        function(err) {
          if (err) {
            console.error('Error saving image:', err);
          }
        }
      );
      
      results.push({ ...processed, hotel_id, room_id, category });
    }
    
    res.json({ success: true, data: results, message: 'Images uploaded successfully' });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, error: 'Upload failed' });
  }
});

router.put('/reorder', authenticateToken, (req, res) => {
  const { images } = req.body;
  
  images.forEach((img, index) => {
    db.run('UPDATE images SET sort_order = ? WHERE id = ?', [index, img.id]);
  });
  
  res.json({ success: true, message: 'Images reordered' });
});

router.put('/:id', authenticateToken, (req, res) => {
  const { is_hidden, sort_order, category } = req.body;
  db.run(
    'UPDATE images SET is_hidden = ?, sort_order = ?, category = ? WHERE id = ?',
    [is_hidden, sort_order, category, req.params.id],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, error: 'Database error' });
      }
      res.json({ success: true, message: 'Image updated' });
    }
  );
});

router.delete('/:id', authenticateToken, (req, res) => {
  db.get('SELECT * FROM images WHERE id = ?', [req.params.id], (err, image) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Database error' });
    }
    if (image) {
      const basePath = path.join(__dirname, '../../');
      if (image.url) fs.unlink(path.join(basePath, image.url), () => {});
      if (image.thumbnail_url) fs.unlink(path.join(basePath, image.thumbnail_url), () => {});
    }
    
    db.run('DELETE FROM images WHERE id = ?', [req.params.id], function(err) {
      if (err) {
        return res.status(500).json({ success: false, error: 'Database error' });
      }
      res.json({ success: true, message: 'Image deleted' });
    });
  });
});

module.exports = router;
