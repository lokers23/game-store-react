import { Link, NavLink } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useLogin } from '../../contexts/LoginContext';
//import '../../styles/Navigation.css';

function Navigation() {
  const { isLogin, role } = useLogin();
  const { isLoading } = useLogin();
  const { handleLogout } = useLogin();

  if (isLoading) {
    return null;
  }

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light mb-3 shadow-sm'>
      <div className='container-fluid'>
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
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link to='/' className='nav-link'>
                Главная
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/catalog' className='nav-link'>
                Каталог
              </Link>
            </li>
            {role === 'User' && (
              <li className='nav-item'>
                <Link to='/admin' className='nav-link'>
                  Панель администратора
                </Link>
              </li>
            )}

            {!isLogin ? (
              <li className='nav-item'>
                <Link to='/login' className='nav-link'>
                  Войти
                </Link>
              </li>
            ) : (
              <>
                <li className='nav-item'>
                  <Link to='/profile' className='nav-link'>
                    Мои покупки
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/login'
                    className='nav-link'
                    onClick={() => handleLogout()}
                  >
                    Выйти
                  </Link>
                </li>
              </>
            )}

            <li className='nav-item'>
              <Link to='/cart' className='nav-link'>
                Корзина
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
