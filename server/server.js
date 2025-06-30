const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/adminRoutes');
const voteRoutes = require('./routes/vote.route');
const electionRoutes = require('./routes/electionRoutes');

// Enable CORS
app.use(cors());

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/vote', voteRoutes);
app.use('/api/elections', electionRoutes);

app.listen(5000, () => console.log('Server running on port 3000'));


