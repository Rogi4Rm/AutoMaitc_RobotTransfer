const express = require("express");
const path = require("path");

const videosRouter = require("./router/videos");
const statsRouter = require("./router/stats");
const serial = require("./serial");

const app = express();
app.use(express.json());

app.use("/videos", videosRouter);
app.use("/stats", statsRouter);

app.get("/", (req, res) => {
  res.send("Express + SQLite + Serial server running");
});

// 시리얼 포트 경로는 환경변수나 config로 관리하는 게 좋음
const SERIAL_PORT_PATH = "/dev/ttyUSB0"; // 예시 (윈도우면 COM3 등)
serial.initSerial(SERIAL_PORT_PATH);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
