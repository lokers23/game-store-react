import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../../styles/Admin.css';
import { useLogin } from '../../contexts/LoginContext';
import { ROLES } from '../../Constants';

export default function Admin() {
  const navigate = useNavigate();
  const { isLogin, role } = useLogin();

  useEffect(() => {
    console.log('CHECKER');
    if ((role !== ROLES[1] || role !== ROLES[2]) && !isLogin) {
      navigate('..');
    }
  }, [role, isLogin, navigate]);

  return (
    <>
      {isLogin && (role === ROLES[1] || role === ROLES[2]) && (
        <div className=''>
          <div className='d-flex justify-content-center mb-3'>
            <ul className='list-group list-group-horizontal'>
              <li className='list-group-item'>
                <Link to='games' className='text-dark text-decoration-none'>
                  Игры
                </Link>
              </li>
              <li className='list-group-item'>
                <Link to='genres' className='text-dark text-decoration-none'>
                  Жанры
                </Link>
              </li>
              <li className='list-group-item'>
                <Link
                  to='developers'
                  className='text-dark text-decoration-none'
                >
                  Разработчики
                </Link>
              </li>

              <li className='list-group-item'>
                <Link
                  to='publishers'
                  className='text-dark text-decoration-none'
                >
                  Издатели
                </Link>
              </li>

              <li className='list-group-item'>
                <Link
                  to='activations'
                  className='text-dark text-decoration-none'
                >
                  Активации
                </Link>
              </li>
              <li className='list-group-item'>
                <Link to='platforms' className='text-dark text-decoration-none'>
                  Платформы
                </Link>
              </li>
              <li className='list-group-item'>
                <Link
                  to='minSpecifications'
                  className='text-dark text-decoration-none'
                >
                  Минимальная спецификация
                </Link>
              </li>
              <li className='list-group-item'>
                <Link to='keys' className='text-dark text-decoration-none'>
                  Ключи
                </Link>
              </li>
              <li className='list-group-item'>
                <Link to='orders' className='text-dark text-decoration-none'>
                  Заказы
                </Link>
              </li>
              <li className='list-group-item'>
                <Link to='users' className='text-dark text-decoration-none'>
                  Пользователи
                </Link>
              </li>
            </ul>
          </div>
          <div className='outlet'>
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}
