import logo from '../../logo3.png';
function Footer() {
  return (
    <footer
      className='mt-auto position-sticky top-100 text-center text-lg-start mt-5'
      style={{ backgroundColor: '#ebebeb' }}
    >
      <div className='container p-4' style={{ color: 'gray' }}>
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
            <ul className='list-unstyled' style={{ color: 'gray' }}>
              <li className='mb-2'>
                <a
                  href='#!'
                  className=''
                  style={{ textDecoration: 'none', color: 'gray' }}
                >
                  Главная
                </a>
              </li>
              <li className='mb-2'>
                <a href='#!' style={{ textDecoration: 'none', color: 'gray' }}>
                  Каталог
                </a>
              </li>
            </ul>
          </div>
          <div className='col-lg-3 col-md-6 mb-4 mb-md-0'>
            <ul className='list-unstyled mb-0'>
              <li className='mb-2'>
                <a href='#!' style={{ textDecoration: 'none', color: 'gray' }}>
                  Личный кабинет
                </a>
              </li>
              <li className='mb-2'>
                <a href='#!' style={{ textDecoration: 'none', color: 'gray' }}>
                  Мои покупки
                </a>
              </li>
              <li>
                <a href='#!' style={{ textDecoration: 'none', color: 'gray' }}>
                  Активация игры
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className='text-center p-3 fw-bold'
        style={{ backgroundColor: '#f7f7f7' }}
      >
        Copyright © 2023 Game Over - все права защищены
      </div>
    </footer>
  );
}

export default Footer;
