import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { genreService } from '../../../services/GenreService';

export default function CreateGenre() {
  const [genre, setGenre] = useState('');
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    genreService
      .saveGenre({
        id: 0,
        name: genre
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
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
          />
        </label>
        <button type='submit'>Submit</button>
      </form>

      <Link to='..'>Назад</Link>
    </div>
  );
}
