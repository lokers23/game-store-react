import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { publisherService } from '../../../services/PublisherService';
import { InlineError } from '../../InlineError';
import '../../../styles/admin-form.css';

export default function EditPublisher() {
  const { id } = useParams();
  const [publisherName, setPublisherName] = useState('');
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    publisherService
      .getPublisherById(id)
      .then((response) => setPublisherName(response.data.data.name))
      .catch((error) => console.log(error));
  }, [navigate, id]);

  function handleSubmit(event) {
    event.preventDefault();
    publisherService
      .savePublisher(id, {
        id: 0,
        name: publisherName
      })
      .then((response) => {
        navigate('..');
      })
      .catch((error) => setErrors(error.response.data.errors));
  }

  return (
    <div className='container-fluid mb-5'>
      <h2 className='mb-2'>Редактирование издателя</h2>
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
