# GitHub 협업 기본 사용법 (팀용)

> ✅ **주의: `main` 브랜치는 팀장만 병합 가능하며, 승인된 코드만 들어갑니다.**

---

## 1. 저장소 클론하기
```bash
git clone https://github.com/Rogi4Rm/AutoMaitc_RobotTransfer.git    # 저장소 클론
cd AutoMaitc_RobotTransfer                                           # 폴더로 이동
git checkout div                                                    # div 브랜치로 이동
git pull origin div                                                 # div 브랜치 최신 내용 가져오기
```

## 2. 작업 브랜치에서 작업하기
- 모든 작업(기능 추가, 수정, 삭제, 테스트)은 div 브랜치에서 직접 진행합니다.
```bash
git checkout div          # div 브랜치로 이동
git pull origin div       # div 브랜치 최신 내용 가져오기
```

## 3. 개발 작업하기
```bash
git add .                                        # 변경된 파일 추가
git commit -m "feat: 기능명에 대한 간단한 설명"   # 커밋 메시지 작성 (형식 지켜서 작성)
git push origin div                              # div 브랜치에 코드 푸시
```

## 4. Pull Request(PR) 만들기
- GitHub에서 div 브랜치 → main 브랜치로 PR 생성 (배포용 병합)
- PR 제목과 내용을 명확하게 작성
- 팀원 또는 팀장에게 리뷰 요청

## 5. PR 승인 및 병합
- 팀장이 PR 확인 및 승인
- 승인 후 main 브랜치에 병합 (배포용)
- 팀원은 main 브랜치에 직접 병합하지 않습니다

## 6. 로컬 브랜치 최신 상태로 유지
```bash
git checkout div        # div 브랜치로 이동
git pull origin div     # div 브랜치 최신 상태 유지
```