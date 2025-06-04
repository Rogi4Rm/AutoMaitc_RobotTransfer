const express = require("express");
const router = express.Router();
const dbService = require("../db/database");

// 전체 비디오 데이터 조회 API
router.get("/", async (req, res) => {
  try {
    const videos = await dbService.getAllVideos();  // DB에서 모든 비디오 데이터 조회
    res.json(videos);  // JSON 형태로 응답
  } catch (error) {
    res.status(500).json({ error: error.message });  // 서버 오류 응답
  }
});

// 새 비디오 데이터 추가 API
router.post("/", async (req, res) => {
  const { date, url, boxCounts } = req.body;  // 요청 바디에서 날짜, URL, 상자 개수 추출
  // 필수 필드 누락 검증
  if (!date || !url || !boxCounts) {
    return res.status(400).json({ error: "Missing required fields" });  // 누락 시 400 에러 응답
  }
  try {
    const id = await dbService.addVideo({ date, url, boxCounts });  // DB에 새 비디오 데이터 추가
    res.json({ id });  // 추가된 데이터 ID 반환
  } catch (error) {
    res.status(500).json({ error: error.message });  // 서버 오류 처리
  }
});

module.exports = router;  // 라우터 모듈 내보내기
