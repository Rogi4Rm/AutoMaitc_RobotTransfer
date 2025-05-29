const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const DB_FILE = path.resolve(__dirname, "./sqlite.db");
const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) console.error("DB connection error:", err.message);
  else {
    console.log("Connected to SQLite DB");

    // 🔧 테이블 생성: stats
    db.run(`
      CREATE TABLE IF NOT EXISTS stats (
        date TEXT PRIMARY KEY,
        red_boxes INTEGER,
        green_boxes INTEGER,
        blue_boxes INTEGER
      )
    `, (err) => {
      if (err) console.error("stats 테이블 생성 실패:", err.message);
      else console.log("stats 테이블 준비 완료");
    });

    // 🔧 테이블 생성: Video
    db.run(`
      CREATE TABLE IF NOT EXISTS videos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        url TEXT,
        boxCounts TEXT
      )
    `, (err) => {
      if (err) console.error("videos 테이블 생성 실패:", err.message);
      else console.log("videos 테이블 준비 완료");
    });
  }
});

// 📦 전체 비디오 조회
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

function getAllStats() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM stats", [], (err, rows) => {
      if (err) reject(err);
      else {
        // rows 그대로 전달해도 되고, 원하는 형태로 가공 가능
        resolve(rows);
      }
    });
  });
}

function getVideosByDate(date) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM videos WHERE date = ?", [date], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}


function getStatsByDate(date) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM stats WHERE date = ?", [date], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}


// 📦 비디오 추가
function addVideo({ date, url, boxCounts }) {
  return new Promise((resolve, reject) => {
    const boxCountsStr = JSON.stringify(boxCounts);
    const sql = `INSERT INTO videos (date, url, boxCounts) VALUES (?, ?, ?)`;
    db.run(sql, [date, url, boxCountsStr], function (err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });
}

// 📦 통계(stats) 추가
function insertStats({ date, red, green, blue }) {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT OR REPLACE INTO stats (date, red_boxes, green_boxes, blue_boxes)
      VALUES (?, ?, ?, ?)
    `;
    db.run(sql, [date, red, green, blue], function (err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });
}

module.exports = {
  db,
  getAllVideos,
  getAllStats,
  getVideosByDate,
  getStatsByDate,
  addVideo,
  insertStats,
};
