const express = require("express");
const router = express.Router();
const dbService = require("../db/database");

// 전체 비디오 조회
router.get("/", async (req, res) => {
  try {
    const videos = await dbService.getAllVideos();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 새 비디오 추가
router.post("/", async (req, res) => {
  const { date, url, boxCounts } = req.body;
  if (!date || !url || !boxCounts) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const id = await dbService.addVideo({ date, url, boxCounts });
    res.json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
