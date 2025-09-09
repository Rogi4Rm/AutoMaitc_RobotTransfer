import { Router } from "express";

const router = Router();

// GET /radar - 레이더 데이터 조회 (더미)
router.get("/", (req, res) => {
    const distance = Math.floor(Math.random() * 100);
    res.status(200).json({ distance });
});

export default router;