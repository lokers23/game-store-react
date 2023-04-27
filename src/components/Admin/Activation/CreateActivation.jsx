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
    <div>
      <h1>Добавить новую площадку для активации ключа</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Название:
          <input
            type='text'
            value={activationName}
            onChange={(event) => setActivationName(event.target.value)}
          />
        </label>
        <button type='submit'>Отправить</button>
      </form>

      <Link to='..'>Назад</Link>
    </div>
  );
}
