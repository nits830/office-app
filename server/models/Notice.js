// models/Notice.js
const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
  title: String,
  description: String,
  documentUrl: String, // File path or cloud URL
  postedBy: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Notice', NoticeSchema);
