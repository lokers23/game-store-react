import { Link, Outlet } from 'react-router-dom';
import Purchases from './Purchases';

function Profile() {
  return (
    <div className='mx-auto' style={{ maxWidth: '1000px' }}>
      <h1 className='mb-3 p-3 shadow bordered rounded'>Личный кабинет</h1>
      <div className='row m-0'>
        <div
          className='me-3 p-3 col-3 shadow bordered rounded'
          style={{ height: '300px' }}
        >
          <ul className='p-0 m-0' style={{ listStyle: 'none' }}>
            <li className='mb-3'>
              <Link
                to={''}
                className='text-dark'
                style={{ textDecoration: 'none' }}
              >
                <i className='bi-people-fill'></i> Личный кабинет
              </Link>
            </li>
            <li className='mb-3'>
              <Link
                to={'purchases'}
                className='text-dark'
                style={{ textDecoration: 'none' }}
              >
                <i className='bi-archive-fill'></i> Мои покупки
              </Link>
            </li>
            {/* <li className='mb-3'>
              <i className='bi-envelope-fill'></i> Обратная связь
            </li> */}
          </ul>
        </div>
        <div className='col p-0'>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}
export default Profile;
