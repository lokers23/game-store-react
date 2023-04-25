import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tokenService from '../../services/TokenService';
import InlineError from '../InlineError';

function Login() {
  const keyLocalStorage = 'game-store';
  const user = { login: '', password: '' };

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onChangeHandler = (setFunction, event) => {
    setFunction(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    user.login = login;
    user.password = password;

    console.log(`login:${login}  ---  password:${password}`);
    const url = 'https://localhost:7125/api/account/login';

    axios
      .post(url, user)
      .then((response) => tokenService.setToken(keyLocalStorage, response.data))
      .then(() => navigate('/'))
      .catch((error) => error.message);
  };

  return (
    <div>
      <h1>Вход в аккаунт</h1>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label>Login</label>
          <input
            placeholder='Login...'
            name='login'
            onChange={(e) => onChangeHandler(setLogin, e)}
          />
          <InlineError field='login' />
        </div>
        <div>
          <label>Password</label>
          <input
            placeholder='Password...'
            name='password'
            onChange={(e) => onChangeHandler(setPassword, e)}
          />
          <InlineError field='password' />
        </div>
        <input type='submit' />
      </form>
    </div>
  );
}

export default Login;
