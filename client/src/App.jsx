import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // 헤더 컴포넌트
import Navigation from './components/Navigation'; // 네비게이션 컴포넌트
import Footer from './components/Footer'; // 푸터 컴포넌트


import Home from './pages/Home'; // 홈 페이지
import Control from './pages/Control'; // 컨트롤 페이지
import Data from './pages/Data' //DB데이터 확인 페이지

function App() {
  return (
    <Router>
      <Header /> {/* 헤더를 상단에 배치 */}
      <Navigation /> {/* 네비게이션 메뉴를 상단에 배치 */}

      <main>
        <Routes>
          <Route path="/" element={<Home />} /> {/* 홈 페이지 */}
          <Route path="/Control" element={<Control />} /> {/* 컨트롤 페이지 */}
          <Route path="/Data" element={<Data />} /> {/* DB데이터 페이지 */}
        </Routes>
      </main>

      <Footer /> {/* 푸터를 하단에 배치 */}
    </Router>
  );
}

export default App;
