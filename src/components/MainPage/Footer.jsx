import { Link } from 'react-router-dom';
import logo from '../../white-logo.png';
function Footer() {
  return (
    <footer
      className='mt-auto position-sticky top-100 text-center text-lg-start mt-5'
      style={{ backgroundColor: '#2b2e32' }}
    >
      <div className='container p-4 text-white'>
        <div className='row'>
          <div className='col-lg-6 col-md-12 mb-4 mb-md-0'>
            <a className='d-flex justify-content-start mb-2' href='/'>
              <img src={logo} alt='logo' height='30' />
            </a>

            <p>
              Онлайн магазин компьютерных игр. Покупай ключи и активируй их на
              игровых платформах, как Steam, Uplay, Battle.net, Origin и другие.
            </p>
          </div>
          <div className='col-lg-3 col-md-6 mb-4 mb-md-0'>
            <ul className='list-unstyled'>
              <li className='mb-2'>
                <Link
                  to={'/'}
                  className='text-white'
                  style={{ textDecoration: 'none' }}
                >
                  Главная
                </Link>
              </li>
              <li className='mb-2'>
                <Link
                  to={'/catalog'}
                  className='text-white'
                  style={{ textDecoration: 'none' }}
                >
                  Каталог
                </Link>
              </li>
              <li className='mb-2'>
                <Link
                  to={'/faq'}
                  className='text-white'
                  style={{ textDecoration: 'none' }}
                >
                  Помощь
                </Link>
              </li>
            </ul>
          </div>
          <div className='col-lg-3 col-md-6 mb-4 mb-md-0'>
            <ul className='list-unstyled mb-0'>
              <li className='mb-2'>
                <Link
                  to={'/profile'}
                  className='text-white'
                  style={{ textDecoration: 'none' }}
                >
                  Личный кабинет
                </Link>
              </li>
              <li className='mb-2'>
                <Link
                  to={'/profile/purchases'}
                  className='text-white'
                  style={{ textDecoration: 'none' }}
                >
                  Мои покупки
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className='text-center p-3 fw-bold text-white border-top'
        style={{ backgroundColor: '#2b2e32' }}
      >
        Copyright © 2023 Game Over - все права защищены
      </div>
    </footer>
  );
}

export default Footer;
