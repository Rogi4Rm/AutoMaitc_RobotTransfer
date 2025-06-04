const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const DB_FILE = path.resolve(__dirname, "./sqlite.db");

// SQLite 데이터베이스 연결
const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) console.error("DB connection error:", err.message);
  else {
    console.log("Connected to SQLite DB");

    // stats 테이블 생성 (날짜별 상자 개수 저장)
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

    // videos 테이블 생성 (비디오 정보 및 상자 개수 JSON 저장)
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

// 전체 비디오 정보 조회 (boxCounts JSON 파싱 포함)
function getAllVideos() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM Video", [], (err, rows) => {
      if (err) reject(err);
      else {
        const videos = rows.map((row) => ({
          ...row,
          boxCounts: JSON.parse(row.boxCounts), // JSON 문자열 -> 객체 변환
        }));
        resolve(videos);
      }
    });
  });
}

// 전체 통계 데이터 조회
function getAllStats() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM stats", [], (err, rows) => {
      if (err) reject(err);
      else {
        resolve(rows); // 조회된 행 전체 반환
      }
    });
  });
}

// 특정 날짜의 비디오 정보 조회
function getVideosByDate(date) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM videos WHERE date = ?", [date], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

// 특정 날짜의 통계 데이터 조회
function getStatsByDate(date) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM stats WHERE date = ?", [date], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

// 새로운 비디오 정보 추가 (boxCounts는 JSON 문자열로 변환하여 저장)
function addVideo({ date, url, boxCounts }) {
  return new Promise((resolve, reject) => {
    const boxCountsStr = JSON.stringify(boxCounts);
    const sql = `INSERT INTO videos (date, url, boxCounts) VALUES (?, ?, ?)`;
    db.run(sql, [date, url, boxCountsStr], function (err) {
      if (err) reject(err);
      else resolve(this.lastID); // 삽입된 행 ID 반환
    });
  });
}

// 통계 데이터 추가 또는 갱신 (날짜 기준 중복 시 대체)
function insertStats({ date, red, green, blue }) {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT OR REPLACE INTO stats (date, red_boxes, green_boxes, blue_boxes)
      VALUES (?, ?, ?, ?)
    `;
    db.run(sql, [date, red, green, blue], function (err) {
      if (err) reject(err);
      else resolve(this.lastID); // 삽입 또는 갱신된 행 ID 반환
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
