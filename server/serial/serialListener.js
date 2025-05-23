const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const db = require('../db/database');

// 실제 시리얼 포트 경로는 나중에 바꾸면 됨
const portPath = '/dev/ttyUSB0';  

const port = new SerialPort({
  path: portPath,
  baudRate: 9600,
}, (err) => {
  if (err) {
    console.error('포트 열기 실패, 임시 더미 데이터로 테스트합니다.', err.message);
    startDummyData();
  } else {
    console.log('포트 열림:', portPath);
  }
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

parser.on('data', (line) => {
  console.log('받은 데이터:', line);
  try {
    const data = JSON.parse(line);

    const insert = db.prepare(`
      INSERT OR REPLACE INTO stats (date, red_boxes, green_boxes, blue_boxes)
      VALUES (?, ?, ?, ?)
    `);

    insert.run(data.date, data.red, data.green, data.blue);
    console.log('DB 저장 완료');
  } catch (e) {
    console.error('데이터 파싱/저장 오류:', e.message);
  }
});

// 실제 시리얼 포트 열기 실패 시 더미 데이터 생성
function startDummyData() {
  setInterval(() => {
    const now = new Date();
    const kstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000); // KST 적용
    const dateTime = kstNow.toISOString().slice(0, 19).replace('T', ' '); // 'YYYY-MM-DD HH:MM:SS' 형식

    const dummyData = {
      date: `dummy-${dateTime}`,
      red: Math.floor(Math.random() * 10),
      green: Math.floor(Math.random() * 10),
      blue: Math.floor(Math.random() * 10),
    };

    // DB 저장 쿼리
    try {
      const insert = db.prepare(`
        INSERT OR REPLACE INTO stats (date, red_boxes, green_boxes, blue_boxes)
        VALUES (?, ?, ?, ?)
      `);
      insert.run(dummyData.date, dummyData.red, dummyData.green, dummyData.blue);
      console.log('더미 데이터 DB 저장 완료:', dummyData);
    } catch (e) {
      console.error('더미 데이터 DB 저장 실패:', e.message);
    }
  }, 15000); //더미데이터 시간은 밀리초단위.0.000
}
