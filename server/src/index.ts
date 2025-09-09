import express from 'express';
import cors from 'cors';
import statsRouter from './routes/stats.router';
import videosRouter from './routes/videos.router';
import listRouter from './routes/list.router';
import radarRouter from './routes/radar.router';
import cameraRouter from './routes/camera.router';

// 시리얼 리스너 모듈을 임포트하여 실행
import './serial/serialListener';

const app = express();
const PORT = process.env.PORT || 4000;

// 미들웨어 설정
app.use(cors()); // CORS 허용
app.use(express.json()); // JSON 요청 본문 파싱
app.use('/videos', express.static('videos')); // 'videos' 폴더를 정적 파일로 제공

// 라우터 연결
app.use('/stats', statsRouter);
app.use('/videos', videosRouter);
app.use('/list', listRouter);
app.use('/radar', radarRouter);
app.use('/camera', cameraRouter);

// 루트 경로
app.get('/', (req, res) => {
  res.send('TypeScript Express 서버가 실행 중입니다!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});