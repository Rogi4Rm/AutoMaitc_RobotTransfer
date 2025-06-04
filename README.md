# RogiArm 프로젝트

## 개요  
RogiArm은 아두이노와 시리얼 통신을 활용해 로봇팔 데이터를 수집하고, React 기반 웹 대시보드에서 실시간 모니터링 및 영상 관리를 제공하는 프로젝트입니다.

## 사용 기술  
- **Frontend:** React, Recoil, react-hook-form, @hello-pangea/dnd  
- **Backend:** Node.js, Express  
- **Database:** SQLite  
- **Hardware 통신:** SerialPort (Node.js serialport 라이브러리)  
- **기타:** CORS, REST API

## 각 구성별 README
- [Back-End (서버)](server/README.md) : Node.js 기반 Sqlite3 DB관리
- [Front-End (클라이언트)](client/README.md) : 홈페이지, 컨트롤, 데이터를 보기위한 UI/UX

## 어려웠던 점 및 해결 방법  
- **시리얼포트 초기화 오류**: `SerialPort is not a constructor` 문제 → `const { SerialPort } = require('serialport');` 로 수정  
- **한국시간 처리 문제**: 서버에서 UTC 시간 저장 문제 → 한국시간 변환 함수 적용  
- **더미 데이터 생성 문제**: 시리얼 연결 실패 시 15초마다 더미 생성하도록 개선  
- **모듈 경로 문제**: `MODULE_NOT_FOUND` 오류 → 경로 수정 및 폴더 구조 정리

## 서버, 사이트사용방법 (라이브러리 설치 먼저 해주세요)
- **1** : clone을 이용하여 전체 복제 후 맥북은 터미널, 윈도우는 명령크프롬프트(CMD)에서 각각 client, server 들어가서 **npm install**을 실행하여 react와 nodeJS를 설치한다
- **2** : server에서는 **node index.js** 명령어를 실행하여 4000포트에 서버를 실행, client에서는 **npm start** 명령어를 쳐서 3000포트에 실행
    - **serial**연결이 안되어 있을 경우 더미데이터 1분마다 생성
- **3** : 페이지 **localhost:3000**에 들어가서 설명 및 통제, 데이터를 확인할 수 있다

## sqlite3 사용방법
```Sqlite3
sqlite3 ./db/sqlite.db //sqlite3 연결
.tables //테이블확인
SELECT * FROM stats //stats정보 확인
DELETE FROM stats WHERE date LIKE 'dummy-%'; //dummy데이터만 삭제
DELETA FROM stats //stats 전체데이터 삭제
```