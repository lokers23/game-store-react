import { Link } from 'react-router-dom';
import '../../styles/Navigation.css';

function Navigation() {
  return (
    <div className='Navigation'>
      <nav className='nav-items'>
        <ul className='items'>
          <li className='item'>
            <Link to='/'>Главная</Link>
          </li>

          <li className='item'>
            <Link to='/admin'>Админка</Link>
          </li>

          <li className='item'>
            <Link to='/profile'>Личный кабинет</Link>
          </li>

          <li className='item'>
            <Link to='/login'>Войти</Link>
          </li>

          <li className='item'>
            <Link to='/cart'>Корзина</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
