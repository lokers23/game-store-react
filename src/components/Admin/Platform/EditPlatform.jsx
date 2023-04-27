import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { platformService } from '../../../services/PlatformService';

export default function EditPlatform() {
  const { id } = useParams();
  const [platformName, setPlatformName] = useState('');
  const navigate = useNavigate();

  const fetchData = () => {
    platformService
      .getPlatformById(id)
      .then((response) => setPlatformName(response.data.data.name))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  function handleSubmit(event) {
    event.preventDefault();
    platformService
      .savePlatform(id, {
        id: 0,
        name: platformName
      })
      .then((response) => {
        navigate('..');
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>Редактирование платформы ОС</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Название:
          <input
            type='text'
            value={platformName}
            onChange={(event) => setPlatformName(event.target.value)}
          />
        </label>
        <button type='submit'>Отправить</button>
      </form>

      <Link to='..'>Назад</Link>
    </div>
  );
}
