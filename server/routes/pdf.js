const express = require('express');
const multer = require('multer');
const path = require('path');
const Notice = require('../models/Notice');

const router = express.Router();

// Configure multer to save PDFs to 'uploads' folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // e.g., 123456.pdf
  }
});
const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF files are allowed!'));
  }
});

// POST /pdf - upload PDF
router.post('/pdf', upload.single('file'), async (req, res) => {
  try {
    const { title, description, postedBy } = req.body;

    if (!req.file) return res.status(400).json({ error: 'No PDF uploaded' });

    const newNotice = new Notice({
      title,
      description,
      postedBy,
      documentUrl: req.file.path,
    });

    await newNotice.save();

    res.status(201).json({ message: 'PDF uploaded successfully', notice: newNotice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /pdf - fetch all PDFs
router.get('/pdf', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch PDFs' });
  }
});

module.exports = router;
