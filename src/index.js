import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Navigation from './components/Navigation/Navigation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Center from './components/MainPage/Center/Center';
import Login from './components/Login/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Navigation/>
    <Routes>
      <Route path='/' element={<Center/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
  </Router>
 
);
