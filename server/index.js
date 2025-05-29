const express = require("express");
const path = require("path");
const cors = require("cors");

const videosRouter = require("./router/videos");
const statsRouter = require("./router/stats");
const listRouter = require('./routes/list');  // 경로는 실제 위치에 맞게!

// 시리얼 리스너 실행
require("./serial/serialListener"); // 실행만 하면 되므로 import만 해도 동작함

const app = express();
app.use(cors());
app.use(express.json());

// 라우터 등록 - 이 부분 꼭 확인하세요!
app.use('/list', listRouter);

app.use("/videos", videosRouter);
app.use("/stats", statsRouter);

app.get("/", (req, res) => {
  res.send("Express + SQLite + Serial server running");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
