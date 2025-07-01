const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config();

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/adminRoutes');
const voteRoutes = require('./routes/vote.route');
const electionRoutes = require('./routes/electionRoutes');
const pdfRoutes = require('./routes/pdf');
const userRoutes = require('./routes/userRoutes');
const noticeRoutes = require('./routes/noticeRoutes');

// Enable CORS
app.use(cors());

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/vote', voteRoutes);
app.use('/api/elections', electionRoutes);
app.use('/api/pdf', pdfRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notices', noticeRoutes);

// MongoDB connect
mongoose.connect(process.env.MONGODB_URI, {
    
  }).then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
  

app.listen(5000, () => console.log('Server running on port 3000'));


