import React from 'react';
import { useEffect, useState } from 'react';
import { gameService } from '../../../services/GameService';
import { Link } from 'react-router-dom';
import '../../../styles/Crud.css';
import Pagination from '../../Pagination/Pagination';
import '../../../styles/admin-table.css';

export default function TableGame() {
  const [games, setGames] = useState([]);

  const [filters, setFilters] = useState(null);
  const [name, setName] = useState(null);

  const [sort] = useState('id_desc');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(3);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const handlePageChange = (value) => {
    setPage(value);
  };

  useEffect(() => {
    gameService
      .getGames(page, pageSize, sort, filters)
      .then((response) => {
        setGames(response.data.data);
        setHasNextPage(response.data.hasNextPage);
        setHasPreviousPage(response.data.hasPreviousPage);
      })
      .catch((error) => console.log(error));
  }, [page, sort, filters, pageSize]);

  function deleteGame(id) {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      gameService
        .deleteGame(id)
        .then((response) => setGames(games.filter((game) => game.id !== id)))
        .catch((error) => console.log(error.data.message));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nameFilter = `&name=${name}`;
    setFilters(nameFilter);
  }

  return (
    <div className='container-fluid mb-5 admin-table'>
      <h2>Игры</h2>
      <Link className='btn admin-create-button btn-sm mb-2' to='create'>
        Добавить новую запись
      </Link>
      <form className='d-flex flex-row mb-2' onSubmit={handleSubmit}>
        <div>
          <label className='form-label '>Название</label>
          <input
            className='form-control'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <button
          type='submit'
          className='btn align-self-end ms-2 admin-filter-button'
        >
          Отфильтровать
        </button>
      </form>
      <table className='table table-striped table-auto'>
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Название</th>
            <th scope='col'>Разработчик</th>
            <th scope='col'>Издатель</th>
            <th scope='col'>Описание</th>
            <th scope='col'>Даты выпуска</th>
            <th scope='col'>Цена</th>
            <th scope='col'>Видео</th>
            <th scope='col'>Аватар</th>
            <th scope='col'>Жанры</th>
            <th scope='col'>Площадка активации</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {games.length > 0 &&
            games.map((game) => (
              <tr key={game.id}>
                <td>{game.id}</td>
                <td>
                  <Link
                    className='text-dark'
                    to={`/game/${game.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    {game.name}
                  </Link>
                </td>
                <td>{game.developer && game.developer.name}</td>
                <td>{game.publisher.name}</td>
                <td>{game.description}</td>
                <td>{game.releaseOn}</td>
                <td>{game.price}$</td>
                <td>
                  <a href={game.videoUrl}>{game.videoUrl}</a>
                </td>
                <td>
                  <img
                    className='img-thumbnail'
                    src={gameService.getAvatarUrl(game.avatarName)}
                    alt={game.avatarName}
                  ></img>
                </td>
                <td>{game.genres.map((genre) => genre.name + '\n')}</td>
                <td>{game.activation.name}</td>
                <td>
                  <button
                    className='btn btn-danger btn-sm me-1 mb-1'
                    onClick={() => deleteGame(game.id)}
                  >
                    <i className='bi-trash-fill' />
                  </button>
                  <Link
                    className='btn btn-warning btn-sm'
                    to={`edit/${game.id}`}
                  >
                    <i className='bi-pencil-square' />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination
        page={page}
        onChange={handlePageChange}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
      />
    </div>
  );
}
