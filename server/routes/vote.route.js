const express = require('express');
const router = express.Router();
const {
  submitVote,
  getElectionResults
} = require('../controllers/vote.controller');

router.post('/submit', submitVote);            // Cast a vote
router.get('/results/:year', getElectionResults); // Get results by year

module.exports = router;
