// server/routes/stats.js
const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/:date', (req, res) => {
  const date = req.params.date;

  try {
    const stat = db.prepare('SELECT * FROM stats WHERE date = ?').get(date);

    if (!stat) {
      return res.status(404).json({ message: '해당 날짜 통계가 없습니다.' });
    }

    res.json(stat);
  } catch (error) {
    console.error('DB 조회 중 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

module.exports = router;
