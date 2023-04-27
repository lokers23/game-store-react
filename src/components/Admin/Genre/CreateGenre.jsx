import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { genreService } from '../../../services/GenreService';

export default function CreateGenre() {
  const [genreName, setGenreName] = useState('');
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
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>Добавить новый жанр</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Название:
          <input
            type='text'
            value={genreName}
            onChange={(event) => setGenreName(event.target.value)}
          />
        </label>
        <button type='submit'>Отправить</button>
      </form>

      <Link to='..'>Назад</Link>
    </div>
  );
}
