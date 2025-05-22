import React, { useState, useEffect } from 'react';
import './Home.css';

const images = [
  { src: "/assets/image/2.PNG", alt: '팀 1' }
];

const targetImages = [
  {
    src: process.env.PUBLIC_URL + '/assets/image/4.png',
    alt: '자동 분류 시스템',
    description: ['필요한 물건을 분리한다']
  },
  {
    src: process.env.PUBLIC_URL + '/assets/image/5.png',
    alt: '안전 운송 로봇',
    description: ['정해진 포인트까지 장애물을 피하며', '안전하게 이동한다']
  }
];

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handlePrev = () => {
    setTargetIndex((prevIndex) => (prevIndex - 1 + targetImages.length) % targetImages.length);
  };

  const handleNext = () => {
    setTargetIndex((prevIndex) => (prevIndex + 1) % targetImages.length);
  };

  return (
    <section className="team-section">

      {/* 개요 */}
      <div className="overview">
        <h2>개요</h2>
        <p>
          물류 자동화를 위한 로봇 팔 분류 시스템입니다.<br />
          분류 효율 향상과 인명 사고 감소를 목표로 합니다.
        </p>
      </div>

      <div className="team-gallery">
        <div className="team-img">
          <img src={images[currentImageIndex].src} alt={images[currentImageIndex].alt} />
        </div>
      </div>

      <hr className="section-divider" />

      {/* 주요 기능 슬라이드 */}
      <div className="skills">
        <h2>예상 기능</h2>
      </div>
      <div className="target">
        <button onClick={handlePrev} className="arrow left">←</button>
        <div className="target-content">
          <img src={targetImages[targetIndex].src} alt={targetImages[targetIndex].alt} className="Target" />
          <div className="target-description">
            {targetImages[targetIndex].description.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
        <button onClick={handleNext} className="arrow right">→</button>
      </div>

      <hr className="section-divider" />

      {/* 기대효과 */}
      <div className="effect">
        <h2>기대효과</h2>
        <ul>
          <li>작업자 안전 확보</li>
          <li>분류 정확도 향상</li>
          <li>물류 처리 속도 증가</li>
        </ul>
      </div>

      <hr className="section-divider" />

      {/* 미래 */}
      <div className="future-section">
        <h2>미래</h2>
        <div className='future-imgs'>
          <img src='/assets/image/1.PNG' alt="미래 1" />
          <img src='/assets/image/3.PNG' alt="미래 2" />
        </div>
      </div>

    </section>
  );
}

export default Home;