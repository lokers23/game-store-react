import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../../styles/Admin.css';
import { useLogin } from '../../contexts/LoginContext';

export default function Admin() {
  const navigate = useNavigate();
  const { role } = useLogin();

  useEffect(() => {
    if (role !== 'User') {
      navigate('/');
    }
  }, []);

  return (
    <>
      {role === 'User' && (
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
                <Link to='/' className='text-dark text-decoration-none'>
                  Заказы
                </Link>
              </li>
              <li className='list-group-item'>
                <Link to='/' className='text-dark text-decoration-none'>
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
