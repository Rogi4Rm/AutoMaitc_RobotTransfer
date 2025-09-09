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

// (참고) 다른 라우터(videos, list 등)도 이런 방식으로 만듭니다.

export default router;