import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { activationService } from '../../../services/ActivationService';
import { InlineError } from '../../InlineError';
import '../../../styles/admin-form.css';

export default function EditActivation() {
  const { id } = useParams();
  const [activationName, setActivationName] = useState('');
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    activationService
      .getActivationById(id)
      .then((response) => setActivationName(response.data.data.name))
      .catch((error) => console.log(error));
  }, [id]);

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
        <InlineError field='Activation' errors={errors} />
        <InlineError field='name' errors={errors} />
        <label className='form-label'>
          Название:
          <input
            className='form-control'
            type='text'
            value={activationName}
            onChange={(event) => setActivationName(event.target.value)}
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
