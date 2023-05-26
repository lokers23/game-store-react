import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { genreService } from '../../../services/GenreService';
import { InlineError } from '../../InlineError';

export default function EditGenre() {
  const { id } = useParams();
  const [genreName, setGenreName] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  // const fetchData = () => {
  //   genreService
  //     .getGenreById(id)
  //     .then((response) => setGenreName(response.data.data.name))
  //     .catch((error) => console.log(error.message));
  // };

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
    <div className='container-fluid'>
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
