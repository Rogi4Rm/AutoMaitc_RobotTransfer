# 🛠️ RogiArm 프로젝트 - 백엔드

## 📦 사용 라이브러리
- 🚀 express@5.1.0  
- 🔐 cors@2.8.5  
- 🔌 serialport@13.0.0  
- 🗄️ sqlite3@5.1.7  

## ⚙️ 주요 기능
- 📡 로봇팔 센서 및 영상 데이터 **실시간 수집 및 저장**  
- 🧪 시리얼 연결 실패 시 **1분 간격 더미 데이터 자동 생성**  
- 🗃️ Sqlite3와 연결하여 **DB 연동 및 데이터 관리**

## 💡 기술 포인트  
- 🔌 Node.js `serialport` 라이브러리를 이용한 **시리얼 통신 구현 및 오류 핸들링**  
- 🗄️ SQLite를 사용한 **가벼운 로컬 DB 구축 및 CRUD API 설계**  
- 🔒 클라이언트 ↔ 서버 간 **CORS 이슈 해결**  
- 🕒 **한국 시간** 기준으로 날짜/시간 처리 및 저장

## 🧱 어려웠던 점 및 해결 방법  
- ⚠️ **시리얼포트 초기화 오류**:  
  `SerialPort is not a constructor` →  
  ✅ `const { SerialPort } = require('serialport');` 로 수정

- 🕒 **한국시간 처리 문제**:  
  서버에서 UTC로 저장되던 시간 → ✅ 한국시간 변환 함수 적용

- 🧪 **더미 데이터 생성 문제**:  
  기존 1분 생성 → ✅ **15초 간격 자동 생성**으로 개선

- 📁 **모듈 경로 문제**:  
  `MODULE_NOT_FOUND` 오류 → ✅ **경로 수정 및 폴더 구조 정리**

## 📅 날짜별 현황
- **25.05.29**: ✅ 백엔드 서버와 프론트 Data페이지 연동, 더미 데이터 확인  
- **25.05.23**: 🔁 백엔드 재구축 및 더미 데이터 생성 로직 수정  
- **25.05.22**: ⚠️ 깃허브 충돌로 백엔드 파일 전체 손실 → 복구 필요

## 🚀 서버 실행 방법
```bash
cd server
npm install
node index.js
```

## 🛠️ sqlite3 사용방법
```sql
# sqlite3 연결
sqlite3 ./db/sqlite.db

# 테이블확인
.tables

# stats정보 확인
SELECT * FROM stats

# dummy데이터만 삭제
DELETE FROM stats WHERE date LIKE 'dummy-%';

# stats 전체데이터 삭제
DELETE FROM stats
```