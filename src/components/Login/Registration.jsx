import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tokenService from '../../services/TokenService';
import InlineError from '../InlineError';
import '../../styles/login.css';
import { useLogin } from '../../contexts/LoginContext';
import { BASE_URL } from '../../Constants';

function Registration() {
  const { handleLogin } = useLogin();
  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mail, setMail] = useState('');

  const [errors, setErrrors] = useState([]);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const user = {
      id: 0,
      login: login,
      password: password,
      confirmPassword: confirmPassword,
      mail: mail
    };

    const url = BASE_URL + '/api/account/register';
    axios
      .post(url, user)
      .then((response) =>
        tokenService.setToken('token-game-store', response.data)
      )
      .then(() => handleLogin())
      .then(() => navigate('/login'))
      .catch((error) => setErrrors(error.response.data.errors));
  };

  return (
    <div className='mx-auto mb-5' style={{ maxWidth: '400px' }}>
      <div className=' shadow rounded-2 p-4'>
        <h3 className='text-center mb-5'>Регистрация</h3>
        <form onSubmit={onSubmitHandler}>
          <InlineError field='singin' errors={errors} />
          <InlineError field='login' errors={errors} />
          <div className='mb-4'>
            <label>Логин</label>
            <input
              className='form-control fs-5 mb-2'
              value={login}
              name='login'
              onChange={(event) => setLogin(event.target.value)}
            />
          </div>

          <InlineError field='password' errors={errors} />
          <div className='mb-4'>
            <label>Пароль</label>
            <input
              className='form-control fs-5 mb-2'
              placeholder=''
              name='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <InlineError field='confirmPassword' errors={errors} />
          <div className='mb-4'>
            <label>Подтвердите пароль</label>
            <input
              className='form-control fs-5 mb-2'
              placeholder=''
              name='confirmPassword'
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>

          <InlineError field='mail' errors={errors} />
          <div className='mb-4'>
            <label>Почта</label>
            <input
              type='mail'
              className='form-control fs-5 mb-2'
              placeholder=''
              name='mail'
              value={mail}
              onChange={(event) => setMail(event.target.value)}
            />
          </div>
          <button className='btn login-button fs-5 w-100 mb-2' type='submit'>
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
