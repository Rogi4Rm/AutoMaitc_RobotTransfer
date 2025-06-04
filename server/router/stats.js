const express = require("express");
const router = express.Router();
const db = require("../db/database");

// 전체 stats 데이터 조회 API
router.get("/", async (req, res) => {
  try {
    const stats = await db.getAllStats();  // DB에서 전체 통계 데이터 조회
    res.json(stats);  // JSON 형태로 응답
  } catch (err) {
    res.status(500).json({ error: err.message });  // 서버 오류 응답
  }
});

// 특정 날짜의 stats 조회 API
router.get("/:date", async (req, res) => {
  const date = req.params.date;  // URL 파라미터에서 날짜 추출

  try {
    const stat = await db.getStatsByDate(date);  // DB에서 해당 날짜 통계 조회
    if (!stat) {
      return res.status(404).json({ error: "No stats found for given date" }); // 데이터 없을 시 404
    }
    res.json(stat);  // 조회된 데이터 반환
  } catch (err) {
    res.status(500).json({ error: err.message });  // 서버 오류 처리
  }
});

// 새로운 stats 데이터 추가 API
router.post("/", async (req, res) => {
  const { date, boxCounts } = req.body;  // 요청 바디에서 날짜와 상자 개수 추출

  // 필수 값 검증
  if (!date || !boxCounts) {
    return res.status(400).json({ error: "Missing 'date' or 'boxCounts'" }); // 누락 시 400 에러
  }

  // boxCounts 내 각 색상 개수 타입 검증
  const { red, green, blue } = boxCounts;
  if (
    typeof red !== "number" ||
    typeof green !== "number" ||
    typeof blue !== "number"
  ) {
    return res.status(400).json({
      error: "boxCounts must include numeric red, green, and blue values",
    }); // 숫자가 아닐 경우 400 에러
  }

  try {
    const id = await db.addStats({ date, boxCounts }); // DB에 새로운 stats 추가 (DB 함수 필요)
    res.json({ id });  // 추가된 데이터 ID 반환
  } catch (err) {
    res.status(500).json({ error: err.message });  // 서버 오류 처리
  }
});

module.exports = router;  // 라우터 모듈 내보내기
