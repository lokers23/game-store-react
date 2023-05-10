import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../../styles/Admin.css';

export default function Admin() {
  return (
    <div>
      <div className='main'>
        <h1 className='title'>Админка</h1>
        <div className='links'>
          <Link className='link' to='games'>
            Игры
          </Link>
          <Link className='link' to='genres'>
            Жанры
          </Link>

          <Link className='link' to='developers'>
            Разработчики
          </Link>
          <Link className='link' to='publishers'>
            Издатели
          </Link>
          <Link className='link' to='activations'>
            Активации
          </Link>
          <Link className='link' to='platforms'>
            Платформы
          </Link>
          <Link className='link' to='minSpecifications'>
            Минимальная спецификация
          </Link>
          <Link className='link' to='keys'>
            Ключи
          </Link>
          <Link className='link' to='/'>
            Заказы
          </Link>
          <Link className='link' to='/'>
            Пользователи
          </Link>
        </div>
      </div>
      <div className='outlet'>
        <Outlet />
      </div>
    </div>
  );
}
