import logo from '../../logo3.png';
function Footer() {
  return (
    <footer
      class='mt-auto position-sticky top-100 text-center text-lg-start mt-5'
      style={{ backgroundColor: '#ebebeb' }}
    >
      <div class='container p-4'>
        <div class='row'>
          <div class='col-lg-6 col-md-12 mb-4 mb-md-0'>
            <a className='d-flex justify-content-start mb-2' href='/'>
              <img src={logo} alt='logo' height='50' />
            </a>

            <p>
              Онлайн магазин компьютерных игр. Покупай ключи и активируй их на
              игровых платформах, как Steam, Uplay, Battle.net, Origin и другие.
            </p>
          </div>
          <div class='col-lg-3 col-md-6 mb-4 mb-md-0'>
            <ul class='list-unstyled'>
              <li>
                <a
                  href='#!'
                  class='text-dark'
                  style={{ textDecoration: 'none' }}
                >
                  Главная
                </a>
              </li>
              <li>
                <a
                  href='#!'
                  class='text-dark'
                  style={{ textDecoration: 'none' }}
                >
                  Каталог
                </a>
              </li>
            </ul>
          </div>
          <div class='col-lg-3 col-md-6 mb-4 mb-md-0'>
            <ul class='list-unstyled mb-0'>
              <li>
                <a
                  href='#!'
                  class='text-dark'
                  style={{ textDecoration: 'none' }}
                >
                  Личный кабинет
                </a>
              </li>
              <li>
                <a
                  href='#!'
                  class='text-dark'
                  style={{ textDecoration: 'none' }}
                >
                  Мои покупки
                </a>
              </li>
              <li>
                <a
                  href='#!'
                  class='text-dark'
                  style={{ textDecoration: 'none' }}
                >
                  Активация игры
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        class='text-center p-3 fw-bold'
        style={{ backgroundColor: '#f7f7f7' }}
      >
        Copyright © 2023 Game Over - все права защищены
      </div>
    </footer>
  );
}

export default Footer;
