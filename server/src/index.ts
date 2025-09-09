import express from 'express';
import cors from 'cors';
import statsRouter from './routes/stats.router';

// 시리얼 리스너 모듈을 임포트하여 실행
import './serial/serialListener';

const app = express();
const PORT = process.env.PORT;

// 미들웨어 설정
app.use(cors()); // CORS 허용
app.use(express.json()); // JSON 요청 본문 파싱

// 라우터 연결
app.use('/stats', statsRouter);
// app.use('/videos', videosRouter);

// 루트 경로
app.get('/', (req, res) => {
  res.send('TypeScript Express 서버가 실행 중입니다!');
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});