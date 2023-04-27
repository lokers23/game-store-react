import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { developerService } from '../../../services/DeveloperService';

export default function EditDeveloper() {
  const { id } = useParams();
  const [developerName, setDeveloperName] = useState('');
  const navigate = useNavigate();

  const fetchData = () => {
    developerService
      .getDeveloperById(id)
      .then((response) => setDeveloperName(response.data.data.name))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  function handleSubmit(event) {
    event.preventDefault();
    developerService
      .saveDeveloper(id, {
        id: 0,
        name: developerName
      })
      .then((response) => {
        navigate('..');
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>Редактирование разработчика</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Название:
          <input
            type='text'
            value={developerName}
            onChange={(event) => setDeveloperName(event.target.value)}
          />
        </label>
        <button type='submit'>Отправить</button>
      </form>

      <Link to='..'>Назад</Link>
    </div>
  );
}
