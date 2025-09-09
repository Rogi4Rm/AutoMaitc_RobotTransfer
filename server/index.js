// 익스프레스, 경로, CORS 모듈 불러오기
const express = require("express");
const path = require("path");
const cors = require("cors");

// 라우터 모듈 불러오기
const videosRouter = require("./router/videos");
const statsRouter = require("./router/stats");
const listRouter = require('./router/list');

// 시리얼 포트 데이터 리스닝 모듈 실행 (import만으로 동작)
require("./serial/serialListener");

const app = express();

// CORS 미들웨어 적용
const allowedOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(",") : [];

app.use(cors({
  origin: function (origin, callback) {
    // 서버에서 요청 origin이 없을 수도 있으므로 null도 허용
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
}));

// JSON 요청 본문 파싱 미들웨어 적용
app.use(express.json());

// 각 기능별 라우터 등록 (경로 확인 필수)
app.use('/list', listRouter);
app.use("/videos", videosRouter);
app.use("/stats", statsRouter);

// 루트 경로 기본 응답
app.get("/", (req, res) => {
  res.send("Express + SQLite + Serial server running");
});

// 서버 포트 설정 및 실행
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
