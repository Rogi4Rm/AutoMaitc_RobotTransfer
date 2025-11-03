# 🔩 RogiArm 프로젝트 - 백엔드 (서버)


>RogiArm 프로젝트의 백엔드 서버입니다. Node.js와 Express를 기반으로 TypeScript로 작성되었으며, 프론트엔드에 데이터를 제공하고 하드웨어(아두이노 등)로부터 시리얼 데이터를 수신하여 데이터베이스에 저장하는 역할을 합니다.

## 📦 사용 라이브러리
### ⚙️ 핵심 라이브러리 (Dependencies)
- express : Node.js 웹 프레임워크
- cors : CORS(Cross-Origin Resource Sharing) 미들웨어
- sqlite3 : SQLite3 데이터베이스 드라이버
- sqlite : async/await를 지원하는 SQLite 래퍼
- serialport : 시리얼 포트(USB/UART) 통신 라이브러리

### 🛠️ 개발 도구 (DevDependencies)
- typescript : JavaScript에 타입을 추가한 슈퍼셋
- ts-node-dev : 변경 사항 감지 및 자동 재시작(Hot-reloading)을 지원하는 TypeScript 실행 도구
- @types/...: [^2, ^5, ^8, ^3] Express, Node, serialport, sqlite3 등을 위한 타입 정의 파일들

## ✨ 주요 기능
- 🗄️ REST API 서버 : Express를 사용해 클라이언트 요청을 처리하는 API 서버 구축
- 💾 데이터베이스 관리 : SQLite를 사용해 통계 데이터(stats)와 비디오 정보(videos)를 영구적으로 저장 및 조회
- 📡 시리얼 통신 : 하드웨어(아두이노 등)에서 전송되는 JSON 형식의 시리얼 데이터를 실시간으로 수신(serialListener)
- 🔄 데이터 자동 저장 : 수신된 시리얼 데이터를 파싱하여 유효성 검사 후 SQLite 데이터베이스에 자동으로 삽입/업데이트

## 🧠 기술 포인트
- TypeScript 기반 : tsconfig.json 설정을 통해 모듈 시스템(CommonJS)과 엄격한 타입 검사(strict: true)를 적용하여 코드 안정성 확보
- 모듈형 라우터 : 기능별(stats, videos, list 등)로 라우터 파일을 분리하여 코드 유지보수성 향상
- 비동기 DB 처리 : async/await와 sqlite 라이브러리를 사용해 비동기적인 데이터베이스 작업을 효율적으로 처리
- 하드웨어 연동 : node-serialport를 이용, Node.js 환경에서 직접 하드웨어 장치(/dev/ttyUSB0)와 통신

## 🧱 어려웠던 점 및 해결 방법
- 🛠️ npm run dev 스크립트 오류 : package.json에 dev 스크립트가 정의되어 있음에도 Missing script : "dev" 오류 발생.
    - 해결 : npm의 캐시 또는 환경 문제로 추정. npx를 사용해 ts-node-dev를 직접 실행하는 명령어로 우회하여 서버 시작에 성공.
-  ⚙️ TypeError 오류 : 빈 라우터 파일을 import 하여 argument handler must be a function 오류 발생.
    - 해결 : database.ts 및 각 라우터 파일에 실제 Express 라우터 코드를 채워 넣어 모듈이 정상적으로 export 되도록 수정.
- 🔌 시리얼 포트 오류 : 하드웨어 장치가 연결되지 않았을 때 Cannot open /dev/ttyUSB0 오류 발생.
    - 해결 : serialListener.ts 내부에 try...catch 구문을 사용하여, 포트 열기에 실패하더라도 서버 전체가 중단되지 않고 정상 실행되도록 처리.

## 🚀 서버 실행 방법
1. server 폴더로 이동
```Bash
cd server
```

2. 필요한 라이브러리 설치
```Bash
npm install
```
(참고: sqlite 라이브러리가 package.json에 없을 수 있으니, npm install sqlite를 추가로 실행해야 할 수 있습니다.)

3. 개발 서버 시작 (Hot-reloading) npm run dev 명령어가 환경 문제로 작동하지 않을 수 있습니다. 아래의 npx 명령어를 사용하세요.
```Bash
npx ts-node-dev --respawn --transpile-only src/index.ts
```

4. 실행 확인 터미널에 Server listening on port 4000 메시지가 나타나면 성공입니다. (시리얼 장치가 연결되지 않았다면 Error: ... cannot open /dev/ttyUSB0 오류가 표시될 수 있으나, 서버 작동에는 문제가 없습니다.)