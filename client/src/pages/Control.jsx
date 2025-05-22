import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pages/Control.css';

const Control = () => {
  const [radarData, setRadarData] = useState(null);
  const [mode, setMode] = useState('MANUAL');
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [gripperState, setGripperState] = useState(false);

  // 방향키 상태 관리 (차체 이동 상태)
  const [directionState, setDirectionState] = useState({
    up: false,
    down: false,
    left: false,
    right: false,
    moving: false, // 차체 이동 상태
  });

  // 레이더 데이터 가져오기
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get('http://localhost:포트번호/radar');
        setRadarData(res.data.distance); // 숫자 형식으로 저장
      } catch (err) {
        setRadarData(null); // 읽기 실패 처리
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 방향키 및 상태 업데이트 함수
  const updateDirectionState = (direction, isPressed) => {
    setDirectionState((prev) => ({
      ...prev,
      [direction]: isPressed,
      moving: isPressed, // 차체가 움직이는 상태로 갱신
    }));
  };

  // 키 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Enter 키로 집게 상태 변경
      if (e.key === 'Enter') {
        setGripperState((prev) => !prev); // 상태 반전
      }

      // WASD QE 키로 XYZ 좌표 업데이트
      setPosition((prev) => {
        const delta = 10;
        switch (e.key.toLowerCase()) {
          case 'w':
            return { ...prev, y: prev.y + delta };
          case 's':
            return { ...prev, y: prev.y - delta };
          case 'a':
            return { ...prev, x: prev.x - delta };
          case 'd':
            return { ...prev, x: prev.x + delta };
          case 'q':
            return { ...prev, z: prev.z + delta };
          case 'e':
            return { ...prev, z: prev.z - delta };
          default:
            return prev;
        }
      });

      // IJKL 키로 차체 이동 상태 갱신
      if (e.key === 'i') updateDirectionState('up', true);
      if (e.key === 'k') updateDirectionState('down', true);
      if (e.key === 'j') updateDirectionState('left', true);
      if (e.key === 'l') updateDirectionState('right', true);
    };

    const handleKeyUp = (e) => {
      // IJKL 키 떼었을 때 차체 이동 상태 변경
      if (e.key === 'i') updateDirectionState('up', false);
      if (e.key === 'k') updateDirectionState('down', false);
      if (e.key === 'j') updateDirectionState('left', false);
      if (e.key === 'l') updateDirectionState('right', false);
    };

    // 이벤트 리스너 등록
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // 클린업 함수
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []); // 의존성 배열을 빈 배열로 설정하여 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

  return (
    <div className="control-container">
      {/* 왼쪽: 카메라 / 센서 */}
      <div className="left-panel">
        <div className="camera-box">
          <h2>📷 우노 카메라</h2>
          <img
            src="http://localhost:/포트번호"
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

      {/* 오른쪽: 모드 / 로봇 팔 / 차체 제어 */}
      <div className="right-panel">
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

        {/* 4축 로봇팔 제어 - 키보드 입력 */}
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

        {/* 집게 상태 표시 */}
        <div className="gripper-box">
          <h2>🦾 집게 상태</h2>
          <p>{gripperState ? '집게가 물고 있습니다' : '집게가 풀려 있습니다'}</p>
        </div>

        {/* 차체 제어 */}
        <div className="drive-box">
          <h2>🚗 차체 제어 (메카넘 휠)</h2>
          <div className="direction-box">
            <button
              className={`direction-btn ${directionState.up ? 'pressed' : ''}`}
            >
              ↑
            </button>
            <div className="horizontal-controls">
              <button
                className={`direction-btn ${directionState.left ? 'pressed' : ''}`}
              >
                ←
              </button>
              <button
                className={`direction-btn ${directionState.down ? 'pressed' : ''}`}
              >
                ↓
              </button>
              <button
                className={`direction-btn ${directionState.right ? 'pressed' : ''}`}
              >
                →
              </button>
            </div>
          </div>
          {/* 차체 이동 중 표시 */}
          {directionState.moving && <div>차체 이동 중...</div>}
        </div>
      </div>
    </div>
  );
};

export default Control;
