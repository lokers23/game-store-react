import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { genreService } from '../../../services/GenreService';
import { InlineError } from '../../InlineError';
import '../../../styles/admin-form.css';

export default function EditGenre() {
  const { id } = useParams();
  const [genreName, setGenreName] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    genreService
      .getGenreById(id)
      .then((response) => setGenreName(response.data.data.name))
      .catch((error) => console.log(error.message));
  }, [navigate, id]);

  function handleSubmit(event) {
    event.preventDefault();
    genreService
      .saveGenre(id, {
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
      <h2 className='mb-2'>Редактирование жанра</h2>
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
