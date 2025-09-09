import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import { insertStats } from '../db/database';

const PORT_PATH = '/dev/ttyUSB0'; // 자신의 환경에 맞는 포트 경로로 수정

try {
  const port = new SerialPort({ path: PORT_PATH, baudRate: 9600 });
  const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

  console.log(`시리얼 포트(${PORT_PATH})가 열렸습니다.`);

  parser.on('data', async (line: string) => {
    try {
      const data = JSON.parse(line);
      console.log('받은 데이터:', data);

      // 받은 데이터가 유효한지 검사 후 DB에 저장
      if (data.date && data.red !== undefined) {
        await insertStats(data);
        console.log('DB 저장 완료');
      }
    } catch (e) {
      console.error('데이터 처리 중 오류:', e);
    }
  });

} catch (error) {
    console.error(`${PORT_PATH} 포트를 여는 데 실패했습니다. 더미 데이터 모드로 전환합니다.`);
    
    // 1분마다 더미 데이터 생성
    setInterval(() => {
        const dummyData = {
            date: new Date().toISOString(),
            red: Math.floor(Math.random() * 10),
            green: Math.floor(Math.random() * 10),
            blue: Math.floor(Math.random() * 10),
        };
        insertStats(dummyData)
            .then(() => console.log('더미 데이터 DB 저장 완료:', dummyData))
            .catch(err => console.error('더미 데이터 저장 실패:', err));
    }, 600000); // 1분
}