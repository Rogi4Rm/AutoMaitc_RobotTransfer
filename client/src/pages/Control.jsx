import React, { useState, useEffect } from 'react';
import axios, { API_URL } from '../api/axios';
import '../pages/Control.css';

const Control = () => {
  // 레이더 거리 데이터
  const [radarData, setRadarData] = useState(null);

  // 로봇 제어 모드: AUTO or MANUAL
  const [mode, setMode] = useState('AUTO');

  // 로봇팔 XYZ 좌표 상태
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });

  // 집게 상태 (true: 닫힘, false: 열림)
  const [gripperState, setGripperState] = useState(false);

  // 차체 방향 상태 (IJKL 키로 조작)
  const [directionState, setDirectionState] = useState({
    up: false,
    down: false,
    left: false,
    right: false,
    moving: false,
  });

  // 레이더 거리 주기적으로 가져오기
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`${API_URL}/radar`);
        setRadarData(res.data.distance);
      } catch (err) {
        setRadarData(null);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 차체 이동 상태 갱신 함수
  const updateDirectionState = (direction, isPressed) => {
    setDirectionState((prev) => ({
      ...prev,
      [direction]: isPressed,
      moving: isPressed,
    }));
  };

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Enter 키 → 집게 열기/닫기 토글
      if (e.key === 'Enter') {
        setGripperState((prev) => !prev);
      }

      // XYZ 좌표 키 입력 처리
      setPosition((prev) => {
        const delta = 10;
        switch (e.key.toLowerCase()) {
          case 'w': return { ...prev, y: prev.y + delta };
          case 's': return { ...prev, y: prev.y - delta };
          case 'a': return { ...prev, x: prev.x - delta };
          case 'd': return { ...prev, x: prev.x + delta };
          case 'q': return { ...prev, z: prev.z + delta };
          case 'e': return { ...prev, z: prev.z - delta };
          default: return prev;
        }
      });

      // IJKL 방향 키 처리
      if (e.key === 'i') updateDirectionState('up', true);
      if (e.key === 'k') updateDirectionState('down', true);
      if (e.key === 'j') updateDirectionState('left', true);
      if (e.key === 'l') updateDirectionState('right', true);
    };

    const handleKeyUp = (e) => {
      // IJKL 방향 키 해제 처리
      if (e.key === 'i') updateDirectionState('up', false);
      if (e.key === 'k') updateDirectionState('down', false);
      if (e.key === 'j') updateDirectionState('left', false);
      if (e.key === 'l') updateDirectionState('right', false);
    };

    // 키보드 이벤트 리스너 등록
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // 컴포넌트 언마운트 시 정리
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="control-container">
      {/* 좌측: 카메라 및 레이더 센서 */}
      <div className="left-panel">
        <div className="camera-box">
          <h2>📷 우노 카메라</h2>
          <img
            src={`${API_URL}/camera`}
            alt="카메라 영상"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className="sensor-box">
          <h2>📡 레이더 센서</h2>
          <p className="radar-text">
            {radarData !== null ? `${radarData} cm` : '읽기 실패'}
          </p>
        </div>
      </div>

      {/* 우측: 모드, 로봇팔, 집게, 차체 제어 */}
      <div className="right-panel">
        {/* 모드 선택 버튼 */}
        <div className="mode-box">
          <h2>🎛 모드 선택</h2>
          <div className="mode-buttons">
            <button
              className={`mode-button ${mode === 'AUTO' ? 'selected' : ''}`}
              onClick={() => setMode('AUTO')}
            >
              AUTO
            </button>
            <button
              className={`mode-button ${mode === 'MANUAL' ? 'selected' : ''}`}
              onClick={() => setMode('MANUAL')}
            >
              MANUAL
            </button>
          </div>
        </div>

        {/* 로봇팔 XYZ 좌표 표시 */}
        <div className="arm-box">
          <h2>🤖 키보드 제어: 로봇 팔 (XYZ)</h2>
          <div className="xyz-coordinates">
            <p><strong>X:</strong> {position.x}</p>
            <p><strong>Y:</strong> {position.y}</p>
            <p><strong>Z:</strong> {position.z}</p>
          </div>
          <div className="key-guide">
            <p><strong>W/S:</strong> Y축 ↑↓</p>
            <p><strong>A/D:</strong> X축 ←→</p>
            <p><strong>Q/E:</strong> Z축 ↑↓</p>
          </div>
        </div>

        {/* 집게 상태 출력 */}
        <div className="gripper-box">
          <h2>🦾 집게 상태</h2>
          <p>{gripperState ? '집게가 물고 있습니다' : '집게가 풀려 있습니다'}</p>
        </div>

        {/* 메카넘 휠 차체 제어 */}
        <div className="drive-box">
          <h2>🚗 차체 제어 (메카넘 휠)</h2>
          <div className="direction-box">
            <button className={`direction-btn ${directionState.up ? 'pressed' : ''}`}>↑</button>
            <div className="horizontal-controls">
              <button className={`direction-btn ${directionState.left ? 'pressed' : ''}`}>←</button>
              <button className={`direction-btn ${directionState.down ? 'pressed' : ''}`}>↓</button>
              <button className={`direction-btn ${directionState.right ? 'pressed' : ''}`}>→</button>
            </div>
          </div>
          {/* 차체 이동 중 여부 표시 */}
          {directionState.moving && <div>차체 이동 중...</div>}
        </div>
      </div>
    </div>
  );
};

export default Control;
