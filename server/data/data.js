// 특정 날짜에 대한 상자 색깔별 통계 데이터를 조회하는 API 엔드포인트
app.get("/data/:date", (req, res) => {
  // URL 파라미터에서 날짜 값 추출
  const { date } = req.params;

  try {
    // 해당 날짜에 대한 통계 데이터 조회 쿼리 준비
    const stmt = db.prepare("SELECT red_boxes, green_boxes, blue_boxes FROM stats WHERE date = ?");
    // 쿼리 실행하여 결과 전체 가져오기
    const rows = stmt.all(date);

    // 조회된 여러 행의 상자 개수를 누적 합산
    const total = rows.reduce(
      (acc, row) => {
        acc.red += row.red_boxes;
        acc.green += row.green_boxes;
        acc.blue += row.blue_boxes;
        return acc;
      },
      { red: 0, green: 0, blue: 0 }
    );

    // 합산 결과를 JSON 형태로 응답
    res.json(total);

  } catch (err) {
    // 오류 발생 시 콘솔에 로그 출력 및 500 에러 응답
    console.error(err);
    res.status(500).json({ error: "Error fetching stats" });
  }
});
