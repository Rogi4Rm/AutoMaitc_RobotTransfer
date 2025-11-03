import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

// DB 파일 경로
const DB_PATH = path.join(__dirname, 'sqlite.db');

// DB 타입 정의 (실제 구조에 맞게 수정 필요)
interface StatsData {
  date: string;
  red: number;
  blue: number;
  white: number;
  total: number;
}

// DB 열기
async function openDb() {
  return open({
    filename: DB_PATH,
    driver: sqlite3.Database,
  });
}

// 테이블 초기화
(async () => {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS stats (
      date TEXT PRIMARY KEY,
      red INTEGER DEFAULT 0,
      blue INTEGER DEFAULT 0,
      white INTEGER DEFAULT 0,
      total INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS videos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      url TEXT,
      boxCounts TEXT
    );
  `);
})();

// --- Stats 관련 함수 ---

export async function getAllStats() {
  const db = await openDb();
  return db.all('SELECT * FROM stats ORDER BY date DESC');
}

export async function getStatsByDate(date: string) {
  const db = await openDb();
  return db.get('SELECT * FROM stats WHERE date = ?', date);
}

export async function insertStats(data: StatsData) {
  const db = await openDb();
  const { date, red, blue, white, total } = data;
  
  // ON CONFLICT...UPDATE: 이미 날짜가 존재하면 값을 덮어씁니다.
  await db.run(
    `INSERT INTO stats (date, red, blue, white, total)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(date) DO UPDATE SET
       red = excluded.red,
       blue = excluded.blue,
       white = excluded.white,
       total = excluded.total`,
    [date, red, blue, white, total]
  );
}

// --- Videos 관련 함수 ---

export async function getAllVideos() {
  const db = await openDb();
  return db.all('SELECT * FROM videos ORDER BY date DESC');
}

export async function addVideo(date: string, url: string, boxCounts: string) {
  const db = await openDb();
  await db.run(
    'INSERT INTO videos (date, url, boxCounts) VALUES (?, ?, ?)',
    [date, url, boxCounts]
  );
}

// --- List 관련 함수 ---

export async function getAllDates() {
  const db = await openDb();
  // stats 테이블에서 날짜만 중복 없이 가져오기
  return db.all('SELECT DISTINCT date FROM stats ORDER BY date DESC');
}