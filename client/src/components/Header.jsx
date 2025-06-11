import React from 'react';
import './Header.css'; //Header스타일 임포트

function Header() {
  return (
    <header>
      <img src={process.env.PUBLIC_URL + '/assets/image/Logo2.png'} alt="RogiARm Logo" className="logo" />
      <h1>RogiARm</h1>
      <p>로봇 팔을 이용한 자동 분류 시스템</p>
    </header>
  );
}

export default Header;
