import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { genreService } from '../../../services/GenreService';
import { InlineError } from '../../InlineError';
import '../../../styles/admin-form.css';

export default function CreateGenre() {
  const [genreName, setGenreName] = useState('');
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    genreService
      .saveGenre(0, {
        id: 0,
        name: genreName
      })
      .then((response) => {
        navigate('..');
      })
      .catch((error) => setErrors(error.response.data.errors));
  }

  return (
    <div className='container-fluid mb-5'>
      <h2 className='mb-2'>Добавить новый жанр</h2>
      <form
        className='d-flex flex-column'
        onSubmit={handleSubmit}
        style={{ maxWidth: '500px' }}
      >
        <InlineError field='Genre' errors={errors} />
        <InlineError field='name' errors={errors} />
        <label className='form-label'>
          Название:
          <input
            className='form-control'
            type='text'
            value={genreName}
            onChange={(event) => setGenreName(event.target.value)}
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
