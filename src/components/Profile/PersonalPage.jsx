import { useEffect, useState } from 'react';
import { userService } from '../../services/UserService';
import { Link } from 'react-router-dom';

function PersonalPage() {
  const [user, setUser] = useState({});
  useEffect(() => {
    userService
      .getUserData()
      .then((response) => setUser(response.data.data))
      .catch();
  }, []);

  return (
    <div
      className='d-flex flex-column shadow bordered rounded p-3'
      style={{ minHeight: '300px' }}
    >
      <p>
        <b>Логин: </b>
        {user.login}
      </p>
      <p>
        <b>Почта: </b>
        {user.mail}
      </p>
      <p>
        <b>Баланс: </b>${user.balance}
      </p>
      <Link to={'balance'}>Пополнить баланс</Link>
      <Link to={'reset-password'}>Сменить пароль</Link>
    </div>
  );
}

export default PersonalPage;
