import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Navigation from './components/Navigation/Navigation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Center from './components/MainPage/Center/Center';
import Login from './components/Login/Login';
import Cart from './components/Cart/Cart';
import Admin from './components/Admin/Admin';
import AdminRoutes from './AdminRoutes';
import MainPage from './components/MainPage/MainPage';
import Profile from './components/Profile/Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/admin' element={<Admin />}>
        {AdminRoutes()}
      </Route>
      <Route path='/profile' element={<Profile />} />
      <Route path='/cart' element={<Cart />} />

      <Route path='*' />
    </Routes>
  </Router>
);
