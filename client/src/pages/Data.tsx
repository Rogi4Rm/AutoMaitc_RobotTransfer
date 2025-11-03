// React 및 훅 import
import { useState, useEffect, useRef } from "react";
import axios, { API_URL } from '../api/axios';
import "../pages-style/Data.css";

export default function RogiArmDashboard() {
  // 날짜 리스트 상태
  const [list, setList] = useState([]);
  // 선택된 날짜 상태
  const [selectedDate, setSelectedDate] = useState(null);
  // 색깔별 상자 개수 상태
  const [boxCounts, setBoxCounts] = useState({});
  // 이전 list 길이를 추적하기 위한 ref
  const prevListLengthRef = useRef(0);

  // 날짜 목록을 가져오는 함수
  const fetchDateList = () => {
    // 이제 이 요청은 '/api/list'를 통해 서버로 안전하게 전달됩니다.
    axios.get(`/list`)
      .then(res => {
        setList(res.data);
      })
      .catch((err) => console.error("API 호출 실패:", err));
  };

  // 5초마다 날짜 목록을 폴링합니다.
  useEffect(() => {
    fetchDateList(); // 초기 로드
    const interval = setInterval(fetchDateList, 5000); // 5초마다 폴링
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);

  // 날짜 목록이 업데이트되면, 새 항목이 추가되었는지 확인하고
  // 추가되었다면 가장 최신 항목을 자동으로 선택합니다.
  useEffect(() => {
    if (list.length > 0 && list.length > prevListLengthRef.current) {
      const newestItem = list[0];
      handleClick(newestItem.file);
    }
    prevListLengthRef.current = list.length;
  }, [list]);


  // 날짜 클릭 시 해당 날짜의 박스 개수 데이터 가져오기
  const handleClick = async (date) => {
    setSelectedDate(date);
    try {
      const res = await axios.get(`/stats/${date}`);
      const json = res.data;
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
    // ... JSX 부분은 이전과 동일 ...
    <div className="dashboard-container">
      <div className="dashboard-body">
        <aside className="dashboard-sidebar">
          <h4>📅 날짜</h4>
          {list.map((item) => {
            const displayTime = item.time.startsWith("dummy-")
              ? item.time.replace("dummy-", "")
              : item.time;
            return (
              <div
                key={item.file}
                className={`date-entry ${selectedDate === item.file ? 'selected' : ''}`}
                onClick={() => handleClick(item.file)}
              >
                {displayTime}
              </div>
            );
          })}
        </aside>
        <main className="dashboard-main">
          <section className="panel large">
            <h4>🎥 우노 동영상</h4>
            {selectedDate ? (
              <video
                src={`${API_URL}/videos/${selectedDate}.mp4`}
                controls
                width="100%"
                key={selectedDate}
              />
            ) : (
              <div className="video">날짜를 선택하세요.</div>
            )}
          </section>
          <div className="dashboard-subpanels">
            <section className="panel small">
              <h4>📦 색깔별 상자 개수</h4>
              {selectedDate ? (
                <ul>
                  {Object.entries(boxCounts).map(([color, count]) => (
                    <li key={color}>
                      {color}: {count}개
                    </li>
                  ))}
                </ul>
              ) : (
                <p>날짜를 선택하세요.</p>
              )}
            </section>
            <section className="panel small">
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}