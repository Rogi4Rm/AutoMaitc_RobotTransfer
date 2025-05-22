const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const DB_FILE = path.resolve(__dirname, "./db/database.db");
const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) console.error("DB connection error:", err.message);
  else console.log("Connected to SQLite DB");
});

// 비디오 전체 조회
function getAllVideos() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM Video", [], (err, rows) => {
      if (err) reject(err);
      else {
        const videos = rows.map((row) => ({
          ...row,
          boxCounts: JSON.parse(row.boxCounts),
        }));
        resolve(videos);
      }
    });
  });
}

// 비디오 추가
function addVideo({ date, url, boxCounts }) {
  return new Promise((resolve, reject) => {
    const boxCountsStr = JSON.stringify(boxCounts);
    const sql = `INSERT INTO Video (date, url, boxCounts) VALUES (?, ?, ?)`;
    db.run(sql, [date, url, boxCountsStr], function (err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });
}

module.exports = {
  getAllVideos,
  addVideo,
  // 나중에 더 필요한 함수 추가 가능
};
