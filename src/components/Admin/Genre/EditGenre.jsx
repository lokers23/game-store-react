import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { genreService } from '../../../services/GenreService';

export default function EditGenre() {
  const { id } = useParams();
  const [genreName, setGenreName] = useState('');
  const navigate = useNavigate();

  const fetchData = () => {
    genreService
      .getGenreById(id)
      .then((response) => setGenreName(response.data.data.name))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

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
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>Редактирование жанра</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Название:
          <input
            type='text'
            value={genreName}
            onChange={(event) => setGenreName(event.target.value)}
          />
        </label>
        <button type='submit'>Submit</button>
      </form>

      <Link to='..'>Назад</Link>
    </div>
  );
}
