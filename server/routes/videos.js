// server/routes/videos.js
const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
  const videos = db.prepare('SELECT * FROM videos ORDER BY date DESC').all();
  res.json(videos);
});

router.get('/:date', (req, res) => {
  const date = req.params.date;
  const videos = db.prepare('SELECT * FROM videos WHERE date = ?').all(date);
  res.json(videos);
});

module.exports = router;
