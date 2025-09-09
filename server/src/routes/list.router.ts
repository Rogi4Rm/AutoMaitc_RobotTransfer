import { Router } from "express";
import * as db from "../db/database";

const router = Router();

// GET /list - 모든 날짜 목록 조회
router.get("/", async (req, res) => {
    try {
        const allDates = await db.getAllDates();
        res.status(200).json(allDates);
    } catch (error) {
        res.status(500).json({ message: "날짜 목록을 가져오는 데 실패했습니다." });
    }
});

export default router;