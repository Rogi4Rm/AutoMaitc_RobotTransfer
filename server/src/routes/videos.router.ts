import { Router } from "express";
import * as db from "../db/database";
import path from 'path';

const router = Router();

// GET /videos - 모든 비디오 정보 조회
router.get("/", async (req, res) => {
    try {
        const allVideos = await db.getAllVideos();
        res.status(200).json(allVideos);
    } catch (error) {
        res.status(500).json({ message: "비디오 목록을 가져오는 데 실패했습니다." });
    }
});

// POST /videos - 새 비디오 추가
router.post("/", async (req, res) => {
    const { date, url, boxCounts } = req.body;
    try {
        await db.addVideo(date, url, boxCounts);
        res.status(201).json({ message: "비디오가 성공적으로 추가되었습니다." });
    } catch (error) {
        res.status(500).json({ message: "비디오를 추가하는 데 실패했습니다." });
    }
});

export default router;