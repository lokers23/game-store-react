import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { activationService } from '../../../services/ActivationService';

export default function EditActivation() {
  const { id } = useParams();
  const [activationName, setActivationName] = useState('');
  const navigate = useNavigate();

  const fetchData = () => {
    activationService
      .getActivationById(id)
      .then((response) => setActivationName(response.data.data.name))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  function handleSubmit(event) {
    event.preventDefault();
    activationService
      .saveActivation(id, {
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
      <h1>Редактирование издателя</h1>
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
