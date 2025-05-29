# RogiArm 프로젝트

## 개요  
RogiArm은 아두이노와 시리얼 통신을 활용해 로봇팔 데이터를 수집하고, React 기반 웹 대시보드에서 실시간 모니터링 및 영상 관리를 제공하는 프로젝트입니다.

## 사용 기술  
- **Frontend:** React, Recoil, react-hook-form, @hello-pangea/dnd  
- **Backend:** Node.js, Express  
- **Database:** SQLite  
- **Hardware 통신:** SerialPort (Node.js serialport 라이브러리)  
- **기타:** CORS, REST API

## 사용 라이브러리
### Frontend (client)
- react@19.1.0
- react-dom@19.1.0
- recoil
- react-hook-form
- @hello-pangea/dnd
- react-router-dom@7.5.3
- axios@1.9.0
- uuid

### Backend (server)
- express@5.1.0
- cors@2.8.5
- serialport@13.0.0
- sqlite3@5.1.7

## 주요 기능
- 로봇팔 센서 및 영상 데이터 실시간 수집 및 저장  
- 시리얼 연결 실패 시 1분 간격 더미 데이터 자동 생성  
- 날짜별 영상 및 센서 데이터 조회  
- 영상 재생 및 색상별 데이터 개수 표시  

## 기술 포인트  
- Node.js SerialPort 라이브러리를 통한 시리얼 통신 구현 및 오류 핸들링  
- SQLite를 사용한 가벼운 DB 구축 및 CRUD API 설계  
- React에서 react-hook-form과 드래그 앤 드롭 라이브러리 조합으로 유저 편의성 강화  
- 서버와 클라이언트간 CORS 이슈 해결  
- 한국 시간 기준으로 날짜/시간 처리 및 저장  

## 어려웠던 점 및 해결 방법  
- **시리얼포트 초기화 오류**: `SerialPort is not a constructor` 문제 → `const { SerialPort } = require('serialport');` 로 수정  
- **한국시간 처리 문제**: 서버에서 UTC 시간 저장 문제 → 한국시간 변환 함수 적용  
- **더미 데이터 생성 문제**: 시리얼 연결 실패 시 15초마다 더미 생성하도록 개선  
- **모듈 경로 문제**: `MODULE_NOT_FOUND` 오류 → 경로 수정 및 폴더 구조 정리

## 서버, 사이트사용방법 (라이브러리 설치 먼저 해주세요)
- **1** : clone을 이용하여 전체 복제 후 맥북은 터미널, 윈도우는 명령크프롬프트(CMD)에서 각각 client, server 들어가서 npm install을 실행한다
- **2** : server에서는 **node index.js** 명령어를 실행하여 4000포트에 서버를 실행, client에서는 **npm start** 명령어를 쳐서 3000포트에 실행
    - **serial**연결이 안되어 있을 경우 더미데이터 1분마다 생성
- **3** : 페이지 **localhost:3000**에 들어가서 설명 및 통제, 데이터를 확인할 수 있다

## sqlite3 사용방법
- **sqlite3 접속방법** : 터미널에 **sqlite3 ./db/sqlite.db**를 작성하여 접속
- **테이블 확인** : **.tables**를 작성하여 테이블 확인 
    - videos : 비디오파일
    - stats : 상자 데이터 및 날짜 파일
- **테이블별 데이터 확인** : **SELECT * FROM stats**을 사용하여 stats정보 확인
- **더미데이터 삭제** : **DELETE FROM stats WHERE date LIKE 'dummy-%';**을 사용하여 dummy데이터만 삭제
- **전체데이터 삭제** : **DELETA FROM stats**을 사용하여 stats 전체데이터 삭제


## 날짜별 현황
- **25.05.29**: 백엔드 서버와 프론트엔드 Data페이지와 연동하여 더미데이터 확인
- **25.05.23**: 백엔드 서버 재구축, 더미데이터와 Data페이지 수정
- **25.05.22**: 백엔드 서버 구성하였으나 깃허브 올리는 과정에서 충돌 발생으로 파일 전부 날라감
- **25.05.15**: 프론트엔드 Data페이지 생성
- **25.05.07**: 프론트엔드 만들기 시작 (Home, Control페이지)