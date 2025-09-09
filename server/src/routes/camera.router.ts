import { Router } from "express";
import path from "path";

const router = Router();

// GET /camera - 카메라 영상 스트리밍 (더미 이미지)
router.get("/", (req, res) => {
    // 실제 카메라 스트리밍 대신 정적 이미지를 전송합니다.
    const imagePath = path.join(__dirname, '..', '..', 'public', 'camera_placeholder.jpg');
    res.sendFile(imagePath);
});

export default router;