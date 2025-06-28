const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/adminRoutes');
const voteRoutes = require('./routes/vote.routes');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/vote', voteRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));


