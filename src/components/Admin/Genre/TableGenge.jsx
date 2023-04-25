import React from 'react';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { genreService } from '../../../services/GenreService';
import { Link } from 'react-router-dom';

export default function TableGenge() {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);

  const fetchData = () => {
    genreService
      .getGenres()
      .then((response) => setGenres(response.data.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  function deleteGenre(id) {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      genreService
        .deleteGenre(id)
        .then((response) =>
          setGenres(genres.filter((genre) => genre.id !== id))
        )
        .catch((error) => console.log(error.data.message));
    }
  }

  return (
    <div>
      <h1>Жанры</h1>
      <Link to='create'>Добавить новую запись</Link>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Название</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {genres.length > 0 &&
            genres.map((genre) => (
              <tr key={genre.id}>
                <td>{genre.id}</td>
                <td>{genre.name}</td>
                <td>
                  <button onClick={() => deleteGenre(genre.id)}>Удалить</button>
                </td>
                <td>
                  <Link to={`edit/${genre.id}`}> Редактировать</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
