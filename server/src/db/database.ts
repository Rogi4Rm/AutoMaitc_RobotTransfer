import sqlite3 from "sqlite3";
import path from "path";
import { IVideo, IStats, IBoxCounts } from "../types";

// DB 파일 경로 설정 (src/db/sqlite.db 에 생성됨)
const DB_FILE = path.resolve(__dirname, "sqlite.db");

// DB 연결
const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) return console.error("DB 연결 오류:", err.message);

  console.log("SQLite DB에 연결되었습니다.");

  // 테이블이 없으면 생성
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS stats (
        date TEXT PRIMARY KEY,
        red_boxes INTEGER NOT NULL,
        green_boxes INTEGER NOT NULL,
        blue_boxes INTEGER NOT NULL
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS videos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        url TEXT NOT NULL,
        boxCounts TEXT NOT NULL
      )
    `);
  });
});

// 모든 통계 조회 함수
export function getAllStats(): Promise<IStats[]> {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM stats ORDER BY date DESC", [], (err, rows: IStats[]) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// 통계 추가/수정 함수
export function insertStats(data: { date: string; red: number; green: number; blue: number; }): Promise<void> {
    return new Promise((resolve, reject) => {
        const sql = `INSERT OR REPLACE INTO stats (date, red_boxes, green_boxes, blue_boxes) VALUES (?, ?, ?, ?)`;
        db.run(sql, [data.date, data.red, data.green, data.blue], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

// (추가) 필요한 다른 DB 함수들도 여기에 Promise 기반으로 만드세요.
// ex: addVideo, getAllVideos 등...