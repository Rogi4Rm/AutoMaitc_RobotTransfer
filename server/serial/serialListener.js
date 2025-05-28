const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const { insertStats } = require('../db/database'); // db가 아닌 insertStats 함수만

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

parser.on('data', async (line) => {
  console.log('받은 데이터:', line);
  try {
    const data = JSON.parse(line);

    await insertStats({
      date: data.date,
      red: data.red,
      green: data.green,
      blue: data.blue,
    });

    console.log('DB 저장 완료');
  } catch (e) {
    console.error('데이터 파싱/저장 오류:', e.message);
  }
});

function startDummyData() {
  setInterval(async () => {
    const now = new Date();
    const kstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    const dateTime = kstNow.toISOString().slice(0, 19).replace('T', ' ');

    const dummyData = {
      date: `dummy-${dateTime}`,
      red: Math.floor(Math.random() * 10),
      green: Math.floor(Math.random() * 10),
      blue: Math.floor(Math.random() * 10),
    };

    try {
      await insertStats(dummyData);
      console.log('더미 데이터 DB 저장 완료:', dummyData);
    } catch (e) {
      console.error('더미 데이터 DB 저장 실패:', e.message);
    }
  }, 15000);
}
