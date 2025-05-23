const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
  // stats 테이블에서 날짜 목록만 가져오기 (내림차순)
  const stmt = db.prepare('SELECT date FROM stats ORDER BY date DESC');
  const rows = stmt.all();

  console.log('DB rows from /list (stats 기준):', rows);

  // 비디오 파일명이 없으니 file 필드 대신 날짜 문자열로 대체
  const list = rows.map(row => ({
    time: row.date,
    file: row.date  // React에서 클릭 이벤트에 사용할 key 값으로 활용
  }));

  res.json(list);
});

module.exports = router;
