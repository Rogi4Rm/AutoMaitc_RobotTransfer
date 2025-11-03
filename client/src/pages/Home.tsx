import { useState, useEffect } from 'react';
import '../pages-style/Home.css'; // 스타일시트 불러오기

// 이미지 import
import image2 from '../assets/image/2.PNG';
import image4 from '../assets/image/4.png';
import image5 from '../assets/image/5.png';
import image1 from '../assets/image/1.PNG';
import image3 from '../assets/image/3.PNG';

// 상단 팀 이미지(슬라이드에 사용될 수 있음)
const images = [
  { src: image2, alt: '팀 1' }
];

// 주요 기능 설명에 사용할 이미지와 설명 문구들
const targetImages = [
  {
    src: image4,
    alt: '자동 분류 시스템',
    description: ['필요한 물건을 분리한다']
  },
  {
    src: image5,
    alt: '안전 운송 로봇',
    description: ['정해진 포인트까지 장애물을 피하며', '안전하게 이동한다']
  }
];

function Home() {
  // 팀 이미지 인덱스 상태
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // 주요 기능 슬라이드 인덱스 상태
  const [targetIndex, setTargetIndex] = useState(0);

  // 팀 이미지 자동 슬라이드 기능 (5초마다 이미지 변경)
  useEffect(() => {
    // 이미지가 1개일 경우 슬라이드를 실행할 필요가 없음
    if (images.length > 1) {
      const intervalId = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
      }, 5000);
      return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 타이머 해제
    }
  }, [images.length]); // images.length를 의존성 배열에 추가

  // 왼쪽 버튼 클릭 시 이전 기능 이미지로 이동
  const handlePrev = () => {
    setTargetIndex((prevIndex) => (prevIndex - 1 + targetImages.length) % targetImages.length);
  };

  // 오른쪽 버튼 클릭 시 다음 기능 이미지로 이동
  const handleNext = () => {
    setTargetIndex((prevIndex) => (prevIndex + 1) % targetImages.length);
  };

  return (
    <section className="team-section">

      {/* 개요 섹션 */}
      <div className="overview">
        <h2>개요</h2>
        <p>
          물류 자동화를 위한 로봇 팔 분류 시스템입니다.<br />
          분류 효율 향상과 인명 사고 감소를 목표로 합니다.
        </p>
      </div>

      {/* 팀 이미지 영역 */}
      <div className="team-gallery">
        <div className="team-img">
          {images.length > 0 && (
            <img src={images[currentImageIndex].src} alt={images[currentImageIndex].alt} />
          )}
        </div>
      </div>

      <hr className="section-divider" />

      {/* 예상 기능 슬라이드 섹션 */}
      <div className="skills">
        <h2>예상 기능</h2>
      </div>
      <div className="target">
        {/* 이전 기능으로 이동하는 화살표 버튼 */}
        <button onClick={handlePrev} className="arrow left">←</button>

        {/* 현재 기능 이미지와 설명 표시 */}
        <div className="target-content">
          {targetImages.length > 0 && (
            <>
              <img src={targetImages[targetIndex].src} alt={targetImages[targetIndex].alt} className="Target" />
              <div className="target-description">
                {targetImages[targetIndex].description.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </>
          )}
        </div>

        {/* 다음 기능으로 이동하는 화살표 버튼 */}
        <button onClick={handleNext} className="arrow right">→</button>
      </div>

      <hr className="section-divider" />

      {/* 기대효과 섹션 */}
      <div className="effect">
        <h2>기대효과</h2>
        <ul>
          <li>작업자 안전 확보</li>
          <li>분류 정확도 향상</li>
          <li>물류 처리 속도 증가</li>
        </ul>
      </div>

      <hr className="section-divider" />

      {/* 미래 비전 섹션 */}
      <div className="future-section">
        <h2>미래</h2>
        <div className='future-imgs'>
          <img src={image1} alt="미래 1" />
          <img src={image3} alt="미래 2" />
        </div>
      </div>

    </section>
  );
}

export default Home;