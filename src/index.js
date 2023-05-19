import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Navigation from './components/Navigation/Navigation';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import Center from './components/MainPage/Center/Center';
import Login from './components/Login/Login';
import Cart from './components/Cart/Cart';
import Admin from './components/Admin/Admin';
import AdminRoutes from './AdminRoutes';
import MainPage from './components/MainPage/MainPage';
import Profile from './components/Profile/Profile';
import GamePage from './components/Admin/Game/GamePage';
import axios from 'axios';
import { LoginProvider, useLogin } from './contexts/LoginContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

root.render(
  <LoginProvider>
    <Router>
      <Navigation />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/game/:id' element={<GamePage />} />
        <Route path='/login' element={<Login />} />
        <Route>
          <Route path='/admin' element={<Admin />}>
            {AdminRoutes()}
          </Route>
        </Route>

        <Route path='/profile' element={<Profile />} />
        <Route path='/cart' element={<Cart />} />

        <Route path='*' />
      </Routes>
    </Router>
  </LoginProvider>
);
