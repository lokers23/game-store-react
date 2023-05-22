import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { activationService } from '../../../services/ActivationService';

export default function CreateActivation() {
  const [activationName, setActivationName] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    activationService
      .saveActivation(0, {
        id: 0,
        name: activationName
      })
      .then((response) => {
        navigate('..');
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className='container-fluid'>
      <h2 className='mb-2'>Добавить новую площадку для активации ключа</h2>
      <form
        className='d-flex flex-column'
        onSubmit={handleSubmit}
        style={{ maxWidth: '500px' }}
      >
        <label className='form-label'>
          Название:
          <input
            className='form-control'
            type='text'
            value={activationName}
            onChange={(event) => setActivationName(event.target.value)}
          />
        </label>
        <button className='btn btn-primary btn-sm mb-2' type='submit'>
          Отправить
        </button>
        <Link className='btn btn-warning btn-sm' to='..'>
          Назад
        </Link>
      </form>
    </div>
  );
}
