import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tokenService from '../../services/TokenService';
import InlineError from '../InlineError';
import '../../styles/login.css';
import { useLogin } from '../../contexts/LoginContext';

function Login() {
  const { handleLogin } = useLogin();
  const user = { login: '', password: '' };

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrrors] = useState([]);

  const navigate = useNavigate();

  const onChangeHandler = (setFunction, event) => {
    setFunction(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    user.login = login;
    user.password = password;

    const url = 'https://localhost:7125/api/account/login';

    axios
      .post(url, user)
      .then((response) =>
        tokenService.setToken('token-game-store', response.data)
      )
      .then(() => handleLogin())
      .then(() => navigate('/'))
      .catch((error) => setErrrors(error.response.data.errors));
  };

  return (
    <div className='mx-auto' style={{ maxWidth: '400px' }}>
      <div className=' shadow rounded-2 p-4'>
        <h3 className='text-center mb-5'>Вход в аккаунт</h3>
        <form onSubmit={onSubmitHandler}>
          <InlineError field='singin' errors={errors} />
          <InlineError field='login' errors={errors} />
          <div className='mb-4'>
            <input
              className='form-control fs-5 mb-2'
              placeholder='Login...'
              name='login'
              onChange={(e) => onChangeHandler(setLogin, e)}
            />
          </div>
          <InlineError field='password' errors={errors} />

          <div className='mb-4'>
            <input
              className='form-control fs-5 mb-2'
              placeholder='Password...'
              name='password'
              onChange={(e) => onChangeHandler(setPassword, e)}
            />
          </div>
          <button className='btn btn-primary fs-5 w-100 mb-2' type='submit'>
            Вход
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
