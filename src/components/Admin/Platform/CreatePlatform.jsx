import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { platformService } from '../../../services/PlatformService';
import { InlineError } from '../../InlineError';
import '../../../styles/admin-form.css';

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
    <div className='container-fluid mb-5'>
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
        <button className='btn btn-sm submit-button mb-2' type='submit'>
          Отправить
        </button>
        <Link className='btn btn-sm back-button m-0' to='..'>
          Назад
        </Link>
      </form>
    </div>
  );
}
