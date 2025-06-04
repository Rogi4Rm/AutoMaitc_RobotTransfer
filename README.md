# RogiArm 프로젝트

## 개요  
RogiArm은 아두이노와 시리얼 통신을 활용해 로봇팔 데이터를 수집하고, React 기반 웹 대시보드에서 실시간 모니터링 및 영상 관리를 제공하는 프로젝트입니다.
(**클론 후 사용 시 서버부터 실행해 주시고 사용방법은 각 구성별 README에 들어가 있습니다**)

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