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

// 새로운 stats 추가
router.post("/", async (req, res) => {
  const { date, boxCounts } = req.body;

  if (!date || !boxCounts) {
    return res.status(400).json({ error: "Missing 'date' or 'boxCounts'" });
  }

  const { red, yellow, green } = boxCounts;
  if (
    typeof red !== "number" ||
    typeof yellow !== "number" ||
    typeof green !== "number"
  ) {
    return res.status(400).json({
      error: "boxCounts must include numeric red, yellow, and green values",
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
