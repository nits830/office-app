const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Notice = require('../models/Notice');

app.use(cors());

// Configure multer for PDF uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDFs are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

// GET all notices
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notices' });
  }
});

// POST a new notice with PDF
router.post('/', upload.single('document'), async (req, res) => {
  try {
    const { title, description, postedBy } = req.body;
    const documentUrl = req.file ? req.file.path : null;

    const newNotice = new Notice({
      title,
      description,
      postedBy,
      documentUrl
    });

    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a notice by ID
router.delete('/:id', async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) return res.status(404).json({ error: 'Notice not found' });

    res.json({ message: 'Notice deleted successfully', notice });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete notice' });
  }
});

module.exports = router;
