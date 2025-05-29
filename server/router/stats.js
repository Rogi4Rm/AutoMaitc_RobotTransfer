const express = require("express");
const router = express.Router();
const db = require("../db/database");

// 전체 stats 조회
router.get("/", async (req, res) => {
  try {
    const stats = await db.getAllStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 해당 stats 조회
router.get("/:date", async (req, res) => {
  const date = req.params.date;

  try {
    const stat = await db.getStatsByDate(date);  // DB에 구현한 함수 필요
    if (!stat) {
      return res.status(404).json({ error: "No stats found for given date" });
    }
    res.json(stat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 새로운 stats 추가
router.post("/", async (req, res) => {
  const { date, boxCounts } = req.body;

  if (!date || !boxCounts) {
    return res.status(400).json({ error: "Missing 'date' or 'boxCounts'" });
  }

  const { red, green, blue } = boxCounts;
  if (
    typeof red !== "number" ||
    typeof green !== "number" ||
    typeof blue !== "number"
  ) {
    return res.status(400).json({
      error: "boxCounts must include numeric red, green, and blue values",
    });
  }

  try {
    const id = await db.addStats({ date, boxCounts });
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
