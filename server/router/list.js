const express = require('express');
const router = express.Router();
const { db } = require('../db/database');

router.get('/', (req, res) => {
  // stats 테이블에서 모든 날짜를 내림차순으로 조회
  db.all('SELECT date FROM stats ORDER BY date DESC', [], (err, rows) => {
    if (err) {
      console.error('DB 조회 오류:', err);
      return res.status(500).json({ error: 'DB 조회 실패' }); // 오류 시 500 상태 코드 반환
    }
    // 비디오 파일명이 없으므로 file 필드 대신 날짜 문자열 사용
    // React에서 클릭 이벤트 시 key 값으로 사용됨
    const list = rows.map(row => ({
      time: row.date,
      file: row.date
    }));

    res.json(list); // 날짜 목록을 JSON으로 반환
  });
});

module.exports = router; // 라우터 모듈 내보내기
