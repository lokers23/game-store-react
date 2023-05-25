import { Link, Outlet } from 'react-router-dom';

function HelpPage() {
  return (
    <div className='mx-auto mb-5' style={{ maxWidth: '1000px' }}>
      <h1 className='mb-3 p-3 shadow bordered rounded'>Помощь</h1>
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
                <i className='bi-people-fill'></i> Контакты
              </Link>
            </li>
            <li className='mb-3'>
              <Link
                to={'activation'}
                className='text-dark'
                style={{ textDecoration: 'none' }}
              >
                <i className='bi-archive-fill'></i> Активация игры
              </Link>
            </li>
          </ul>
        </div>
        <div className='col p-0'>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}
export default HelpPage;
