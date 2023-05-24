import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { platformService } from '../../../services/PlatformService';
import { InlineError } from '../../InlineError';

export default function CreatePlatform() {
  const [platformName, setPlatformName] = useState('');
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    platformService
      .savePlatform(0, {
        id: 0,
        name: platformName
      })
      .then((response) => {
        navigate('..');
      })
      .catch((error) => setErrors(error.response.data.errors));
  }

  return (
    <div className='container-fluid'>
      <h2 className='mb-2'>Добавить новую платформу ОС</h2>
      <form
        className='d-flex flex-column'
        onSubmit={handleSubmit}
        style={{ maxWidth: '500px' }}
      >
        <InlineError field='Platform' errors={errors} />
        <InlineError field='name' errors={errors} />
        <label className='form-label'>
          Название:
          <input
            className='form-control'
            type='text'
            value={platformName}
            onChange={(event) => setPlatformName(event.target.value)}
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
