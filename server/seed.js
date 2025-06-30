// seedNotices.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Notice = require('./models/Notice');
const path = require('path');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const sampleNotices = Array.from({ length: 10 }, (_, i) => ({
  title: `Sample Notice ${i + 1}`,
  description: `This is the description for notice ${i + 1}.`,
  documentUrl: path.join('uploads', `sample${i + 1}.pdf`), // example: uploads/sample1.pdf
  postedBy: `admin${i + 1}@example.com`,
}));

async function seedNotices() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected.');

    await Notice.deleteMany(); // Optional: Clear old data
    console.log('Old notices removed.');

    const inserted = await Notice.insertMany(sampleNotices);
    console.log(`${inserted.length} sample notices inserted.`);

    mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding notices:', err);
    mongoose.disconnect();
  }
}

seedNotices();
