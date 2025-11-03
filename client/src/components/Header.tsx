import { Link } from 'react-router-dom';
import '../components-style/Header.css';
import logo from '../assets/image/Logo.png';

const Header = () => {
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