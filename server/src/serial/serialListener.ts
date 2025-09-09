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
    console.error(`${PORT_PATH} 포트를 여는 데 실패했습니다.`, error);
    // (선택) 포트 연결 실패 시 예시처럼 더미 데이터를 생성하는 로직을 여기에 추가할 수 있습니다.
}