import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/image/Logo.png';

const Header = () => {
  // ✅ 문제가 되는 라인을 삭제하거나 주석 처리
  // const API_URL = process.env.REACT_APP_API_URL;

  return (
    <header>
      <Link to="/">
        <img src={logo} alt="로고" className="logo" />
      </Link>
      <div>
        <h1>RogiARm</h1>
        <p>자동 물류 분류 시스템</p>
      </div>
    </header>
  );
};

export default Header;
