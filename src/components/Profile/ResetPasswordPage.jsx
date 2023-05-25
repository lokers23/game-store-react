import { useEffect, useState } from 'react';
import { userService } from '../../services/UserService';
import { InlineError } from '../InlineError';
import { useNavigate } from 'react-router-dom';

function ResetPasswordPage() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);

  const [newPassword, setNewPassword] = useState('');
  const [confiNewPassword, setConfiNewPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      newPassword: newPassword,
      confirmNewPassword: confiNewPassword
    };

    userService
      .changePassword(data)
      .then(() => navigate('..'))
      .catch((error) => setErrors(error.response.data.errors));
  }

  return (
    <div className='shadow bordered rounded p-3' style={{ minHeight: '300px' }}>
      <form onSubmit={handleSubmit} style={{ width: '400px' }}>
        <div className='mb-2'>
          <InlineError field='newPassword' errors={errors} />
          <label className='form-label'>Новый пароль</label>
          <input
            type='text'
            className='form-control'
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </div>

        <div className='mb-2'>
          <InlineError field='confirmNewPassword' errors={errors} />
          <label className='form-label'>Подтвердить пароль</label>
          <input
            type='text'
            className='form-control'
            value={confiNewPassword}
            onChange={(event) => setConfiNewPassword(event.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Сбросить пароль
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
