import { Link, NavLink } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useLogin } from '../../contexts/LoginContext';
import { LOCAL_STORAGE } from '../../Constants';
import { useCart } from '../../contexts/CartContext';
import logo from '../../game_over.svg';

function Navigation() {
  const { countGames } = useCart();
  const { isLogin, role } = useLogin();
  const { isLoading } = useLogin();
  const { handleLogout } = useLogin();

  if (isLoading) {
    return null;
  }

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light mb-3 shadow-sm '>
      <div className='container-fluid'>
        <a class='navbar-brand' href='/'>
          <img src={logo} alt='logo' height='60' />
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div
          className='collapse navbar-collapse p-1'
          id='navbarSupportedContent'
        >
          <ul className='navbar-nav  mb-2 mb-lg-0 container-fluid'>
            <li className='nav-item'>
              <Link to='/' className='nav-link text-dark'>
                Главная
              </Link>
            </li>
            <li className='nav-item  me-auto'>
              <Link to='/catalog' className='nav-link text-dark'>
                Каталог
              </Link>
            </li>

            {isLogin && role === 'Administrator' && (
              <li className='nav-item me-3'>
                <Link to='/admin' className='nav-link text-dark'>
                  <i className='bi-table'></i> Панель администратора
                </Link>
              </li>
            )}
            {!isLogin ? (
              <li className='nav-item me-3'>
                <Link to='/login' className='nav-link me-5 text-dark'>
                  <i className='bi-door-closed-fill'></i> Войти
                </Link>
              </li>
            ) : (
              <>
                <li className='nav-item me-3'>
                  <Link to='/profile' className='nav-link text-dark'>
                    <i className='bi-person-fill'></i> Личный кабинет
                  </Link>
                </li>
                <li className='nav-item me-3'>
                  <Link
                    to='/login'
                    className='nav-link text-dark'
                    onClick={() => handleLogout()}
                  >
                    <i className='bi-door-open-fill'></i> Выйти
                  </Link>
                </li>
              </>
            )}
            <li className='nav-item me-3'>
              <Link
                to='/cart'
                className='nav-link position-relative text-dark'
                style={{ textDecoration: 'none', maxWidth: '98.25px' }}
              >
                <i className='bi-cart4'></i> Корзина
                <span
                  className='position-absolute start-100 translate-middle badge rounded-pill bg-danger'
                  style={{ top: '25%', fontSize: '11px' }}
                >
                  {countGames !== 0 && countGames}
                </span>
              </Link>
            </li>
          </ul>

          <form>
            <input
              className='form-control'
              type='text'
              placeholder='Поиск...'
            />
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
