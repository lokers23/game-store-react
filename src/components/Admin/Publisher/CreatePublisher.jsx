import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { publisherService } from '../../../services/PublisherService';
import { InlineError } from '../../InlineError';

export default function CreatePublisher() {
  const [publisherName, setPublisherName] = useState('');
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    publisherService
      .savePublisher(0, {
        id: 0,
        name: publisherName
      })
      .then((response) => {
        navigate('..');
      })
      .catch((error) => setErrors(error.response.data.errors));
  }

  return (
    <div className='container-fluid'>
      <h2 className='mb-2'>Добавить нового издателя</h2>
      <form
        className='d-flex flex-column'
        onSubmit={handleSubmit}
        style={{ maxWidth: '500px' }}
      >
        <InlineError field='Publisher' errors={errors} />
        <InlineError field='name' errors={errors} />
        <label className='form-label'>
          Название:
          <input
            className='form-control'
            type='text'
            value={publisherName}
            onChange={(event) => setPublisherName(event.target.value)}
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
