import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { developerService } from '../../../services/DeveloperService';
import { InlineError } from '../../InlineError';

export default function EditDeveloper() {
  const { id } = useParams();
  const [developerName, setDeveloperName] = useState('');
  const [errors, setErrors] = useState([]);

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
      .catch((error) => setErrors(error.response.data.errors));
  }

  return (
    <div className='container-fluid'>
      <h2 className='mb-2'>Редактирование разработчика</h2>
      <form
        className='d-flex flex-column'
        onSubmit={handleSubmit}
        style={{ maxWidth: '500px' }}
      >
        <InlineError field='Developer' errors={errors} />
        <InlineError field='name' errors={errors} />
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
