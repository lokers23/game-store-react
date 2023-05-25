import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../Constants';
import { userService } from '../../services/UserService';

function BalancePage() {
  const [amount, setAmount] = useState(0);

  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(
        URL.BALANCE + `/top-up?amount=${amount}`,
        {},
        userService.getHeader()
      )
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
          className='form-control'
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <button type='submit' className='btn btn-primary'>
          Подтвердить
        </button>
      </form>
    </div>
  );
}

export default BalancePage;
