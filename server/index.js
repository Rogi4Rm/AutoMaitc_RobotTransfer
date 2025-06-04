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
app.use(cors());

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
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
