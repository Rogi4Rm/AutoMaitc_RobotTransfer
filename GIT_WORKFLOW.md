# GitHub 협업 기본 사용법 (팀용)

> ✅ **주의: `main` 브랜치는 팀장만 병합 가능하며, 승인된 코드만 들어갑니다.**

---

## 1. 저장소 클론하기
```bash
git clone https://github.com/Rogi4Rm/AutoMaitc_RobotTransfer.git    # 저장소 클론
cd AutoMaitc_RobotTransfer                                           # 폴더로 이동
git checkout dev                                                    # dev 브랜치로 이동
git pull origin dev                                                 # dev 브랜치 최신 내용 가져오기
```

## 2. 작업 브랜치에서 작업하기
```bash
git checkout 본인브랜치이름             # 예: seunghoon, donghui, inho, doohyuk
git pull origin 본인브랜치이름          # 본인 브랜치 최신 내용 가져오기
```

## 3. 개발 작업하기
```bash
git add .                                        # 본인 폴더 전체 선택
git commit -m "feat: 기능명에 대한 간단한 설명"   # 내용 올리기 전 간단한 설명
git push origin 본인브랜치이름                     # 내용을 본인 브랜치에 올리기
```

## 4. Pull Request(PR) 만들기
- GitHub 저장소에서 본인 브랜치 → `dev` 브랜치로 PR 생성
- PR 제목과 내용을 명확하게 작성
- 팀원 또는 팀장에게 리뷰 요청

## 5. PR 승인 및 병합
- 리뷰어가 PR 내용 확인 및 승인
- 승인 후 `dev` 브랜치에 병합
- 로컬 `dev` 브랜치 최신 상태로 업데이트
```bash
git checkout dev        # dev 브랜치 이동
git pull origin dev     # dev 브랜치 최신내용 불러오기
```

## 6. 배포 준비 및 main 브랜치 병합
- `dev` 브랜치가 안정되면 **팀장이 `main` 브랜치에 병합하여 배포**
- 팀원은 직접 `main` 브랜치에 병합하지 않도록 주의