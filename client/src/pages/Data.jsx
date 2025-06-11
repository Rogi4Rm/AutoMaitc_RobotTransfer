// React 및 훅 import
import React, { useState, useEffect } from "react";
import axios from '../api/axios'
import "./Data.css";

export default function RogiArmDashboard() {
  // 날짜 리스트 상태
  const [list, setList] = useState([]);

  // 선택된 날짜 상태
  const [selectedDate, setSelectedDate] = useState(null);

  // 색깔별 상자 개수 상태
  const [boxCounts, setBoxCounts] = useState({});

  // 컴포넌트 마운트 시 날짜 리스트 불러오기
  useEffect(() => {
    axios.get(`/list`)
      .then((res) => res.json())
      .then((data) => setList(data))
      .catch((err) => console.error("API 호출 실패:", err));
  }, []);

  // 날짜 클릭 시 해당 날짜의 박스 개수 데이터 가져오기
  const handleClick = async (date) => {
    setSelectedDate(date);

    try {
      const res = await axios.get(`/stats/${date}`);
      const json = await res.json();
      setBoxCounts({
        red: json.red_boxes,
        green: json.green_boxes,
        blue: json.blue_boxes,
      });
    } catch (err) {
      setBoxCounts({});
    }
  };

  return (
    // 대시보드 전체 컨테이너
    <div className="dashboard-container">
      <div className="dashboard-body">
        
        {/* 사이드바 - 날짜 목록 */}
        <aside className="dashboard-sidebar">
          <h4>📅 날짜</h4>
          {list.map((item) => {
            // dummy- 접두어 제거
            const displayTime = item.time.startsWith("dummy-")
              ? item.time.replace("dummy-", "")
              : item.time;

            return (
              <div
                key={item.file}
                className="date-entry"
                onClick={() => handleClick(item.file)}
              >
                {displayTime}
              </div>
            );
          })}
        </aside>

        {/* 메인 영역 */}
        <main className="dashboard-main">
          
          {/* 동영상 영역 */}
          <section className="panel large">
            <h4>🎥 우노 동영상</h4>
            {selectedDate ? (
              <video
                src={`${process.env.REACT_APP_API_URL || "http://localhost:4000"}/videos/${selectedDate}.mp4`}
                controls
                width="100%"
              />
            ) : (
              <div className="video">날짜를 선택하세요.</div>
            )}
          </section>

          {/* 하단 정보 영역 */}
          <div className="dashboard-subpanels">
            
            {/* 상자 개수 표시 */}
            <section className="panel small">
              <h4>📦 색깔별 상자 개수</h4>
              <ul>
                {Object.entries(boxCounts).map(([color, count]) => (
                  <li key={color}>
                    {color}: {count}개
                  </li>
                ))}
              </ul>
            </section>

            {/* 향후 추가용 패널 */}
            <section className="panel small">
              {/* TODO: 다른 정보 표시 영역 */}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
