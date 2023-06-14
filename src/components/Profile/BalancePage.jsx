import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../Constants';
//import { userService } from '../../services/UserService';
import '../../styles/admin-form.css';
import tokenService from '../../services/TokenService';

function BalancePage() {
  const [amount, setAmount] = useState(0);

  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    const token = tokenService.getToken();
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
    axios
      .post(URL.BALANCE + `/top-up?amount=${amount}`, {}, headers)
      .then(navigate('..'))
      .catch();
  }

  return (
    <div
      className='d-flex flex-column shadow bordered rounded p-3'
      style={{ minHeight: '300px' }}
    >
      <form onSubmit={handleSubmit}>
        <input
          type='number'
          className='form-control mb-2'
          step={0.01}
          value={amount}
          onChange={(event) => {
            const value = Number(event.target.value);
            if (value >= 0 && value <= 1000) {
              setAmount(event.target.value);
            }
          }}
        />
        <button type='submit' className='btn btn submit-button'>
          Пополнить баланс
        </button>
      </form>
    </div>
  );
}

export default BalancePage;
