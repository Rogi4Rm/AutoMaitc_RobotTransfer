# RogiArm 프로젝트 - 프론트엔드

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

## 주요 기능
- RogiArm의 UI/UX
- 하드웨어 컨트롤을 위한 컨트롤 페이지
- 백엔드에 저장된 

## 기술 포인트 
- React에서 react-hook-form과 드래그 앤 드롭 라이브러리 조합으로 유저 편의성 강화  
- 서버와 클라이언트간 CORS 이슈 해결

## 어려웠던 점 및 해결 방법
- **차체제어**에서 css오류를 해결하기위해 flex를 사용하여 위치 조정
- **CORS**로 백엔드 데이터를 받아오는 과정에서 충돌이 난 것을 백엔드 서버에서 수정 후 재연결로 해결
- **더미데이터**의 이름의 dummy를 삭제하기 위한 과정에서 'dummy-'를 빼서 나타냄

## 날짜별 현황
- **25.05.29**: 백엔드 서버와 프론트엔드 Data페이지와 연동하여 더미데이터 확인
- **25.05.22**: 백엔드 서버 구성하였으나 깃허브 올리는 과정에서 충돌 발생으로 파일 전부 날라감
- **25.05.15**: 프론트엔드 Data페이지 생성
- **25.05.07**: 프론트엔드 만들기 시작 (Home, Control페이지)

## 🚀 클라이언트 실행 방법
```bash
cd client
npm install
npm start