import { Router } from "express";
import * as db from "../db/database";

const router = Router();

// GET /stats - 모든 통계 데이터 조회
router.get("/", async (req, res) => {
  try {
    const allStats = await db.getAllStats();
    res.status(200).json(allStats);
  } catch (error) {
    res.status(500).json({ message: "서버에서 통계를 가져오는 데 실패했습니다." });
  }
});

// GET /stats/:date - 특정 날짜의 통계 데이터 조회
router.get("/:date", async (req, res) => {
    const { date } = req.params;
    try {
        const stats = await db.getStatsByDate(date);
        if (stats) {
            res.status(200).json(stats);
        } else {
            res.status(404).json({ message: "데이터를 찾을 수 없습니다." });
        }
    } catch (error) {
        res.status(500).json({ message: "서버에서 통계를 가져오는 데 실패했습니다." });
    }
});

export default router;