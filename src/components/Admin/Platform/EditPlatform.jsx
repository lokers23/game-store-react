import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { platformService } from '../../../services/PlatformService';
import { InlineError } from '../../InlineError';

export default function EditPlatform() {
  const { id } = useParams();
  const [platformName, setPlatformName] = useState('');
  const [errors, setErrors] = useState([]);

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
      .catch((error) => setErrors(error.response.data.errors));
  }

  return (
    <div className='container-fluid'>
      <h2 className='mb-2'>Редактирование платформы ОС</h2>
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
