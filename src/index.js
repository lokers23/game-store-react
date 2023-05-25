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
import Registration from './components/Login/Registration';
import Cart from './components/Cart/Cart';
import Admin from './components/Admin/Admin';
import AdminRoutes from './AdminRoutes';
import MainPage from './components/MainPage/MainPage';
import Profile from './components/Profile/Profile';
import Purchases from './components/Profile/Purchases';
import GamePage from './components/Admin/Game/GamePage';
import axios from 'axios';
import { LoginProvider, useLogin } from './contexts/LoginContext';
import PersonalPage from './components/Profile/PersonalPage';
import BalancePage from './components/Profile/BalancePage';
import { CartProvider } from './contexts/CartContext';
import Footer from './components/MainPage/Footer';
import CatalogPage from './components/Catalog/CatalogPage';
import ResetPasswordPage from './components/Profile/ResetPasswordPage';
import HelpPage from './components/Help/HelpPage';
import ContactHelpPage from './components/Help/ContactHelpPage';
import ActivationHelpPage from './components/Help/ActivationHelpPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401) {
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

root.render(
  <LoginProvider>
    <CartProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/catalog' element={<CatalogPage />} />
          <Route
            path='/catalog/activation/:activationFilterId'
            element={<CatalogPage />}
          />
          <Route
            path='/catalog/genre/:genreFilterId'
            element={<CatalogPage />}
          />
          <Route
            path='/catalog/search/:searchFilter'
            element={<CatalogPage />}
          />

          <Route path='/faq' element={<HelpPage />}>
            <Route path='' element={<ContactHelpPage />} />
            <Route path='activation' element={<ActivationHelpPage />} />
          </Route>

          <Route path='/game/:id' element={<GamePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
          <Route>
            <Route path='/admin' element={<Admin />}>
              {AdminRoutes()}
            </Route>
          </Route>

          <Route path='/profile' element={<Profile />}>
            <Route path='' element={<PersonalPage />} />
            <Route path='purchases' element={<Purchases />} />
            <Route path='balance' element={<BalancePage />} />
            <Route path='reset-password' element={<ResetPasswordPage />} />
          </Route>
          <Route path='/cart' element={<Cart />} />

          <Route path='*' />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  </LoginProvider>
);
