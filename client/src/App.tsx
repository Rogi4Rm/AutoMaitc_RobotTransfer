import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import Control from './pages/Control'
import Data from './pages/Data'


function App() {

  return (
    <Router>
      <Header />
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Control' element={<Control />} />
        <Route path='/Data' element={<Data />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
