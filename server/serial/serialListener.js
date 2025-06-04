const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const { insertStats } = require('../db/database'); // DB 저장용 insertStats 함수만 임포트

const portPath = '/dev/ttyUSB0';  // 시리얼 포트 경로 설정

const port = new SerialPort({
  path: portPath,
  baudRate: 9600,
}, (err) => {
  if (err) {
    // 포트 열기 실패 시 더미 데이터 생성 함수 실행
    console.error('포트 열기 실패, 임시 더미 데이터로 테스트합니다.', err.message);
    startDummyData();
  } else {
    console.log('포트 열림:', portPath);
  }
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\n' })); // 시리얼 데이터 한 줄 단위로 파싱

parser.on('data', async (line) => {
  console.log('받은 데이터:', line);
  try {
    // JSON 문자열 파싱
    const data = JSON.parse(line);

    // 파싱한 데이터를 DB에 저장
    await insertStats({
      date: data.date,
      red: data.red,
      green: data.green,
      blue: data.blue,
    });

    console.log('DB 저장 완료');
  } catch (e) {
    // 파싱 또는 저장 중 오류 발생 시 로그 출력
    console.error('데이터 파싱/저장 오류:', e.message);
  }
});

// 더미 데이터를 15초마다 생성하여 DB에 저장하는 함수
function startDummyData() {
  setInterval(async () => {
    const now = new Date();
    // 한국 표준시(KST) 기준 현재 시간 계산
    const kstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    const dateTime = kstNow.toISOString().slice(0, 19).replace('T', ' ');

    // 랜덤 박스 개수 포함 더미 데이터 객체 생성
    const dummyData = {
      date: `dummy-${dateTime}`,
      red: Math.floor(Math.random() * 10),
      green: Math.floor(Math.random() * 10),
      blue: Math.floor(Math.random() * 10),
    };

    try {
      // 더미 데이터를 DB에 저장
      await insertStats(dummyData);
      console.log('더미 데이터 DB 저장 완료:', dummyData);
    } catch (e) {
      console.error('더미 데이터 DB 저장 실패:', e.message);
    }
  }, 15000); // 15초 간격 실행
}
