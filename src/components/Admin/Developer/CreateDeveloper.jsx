import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { developerService } from '../../../services/DeveloperService';

export default function CreateDeveloper() {
  const [developerName, setDeveloperName] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    developerService
      .saveDeveloper(0, {
        id: 0,
        name: developerName
      })
      .then((response) => {
        navigate('..');
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className='container-fluid'>
      <h2 className='mb-2'>Добавить нового разработчика</h2>
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
            value={developerName}
            onChange={(event) => setDeveloperName(event.target.value)}
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
