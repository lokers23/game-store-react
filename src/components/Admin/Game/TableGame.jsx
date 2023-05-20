import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameService } from '../../../services/GameService';
import { Link } from 'react-router-dom';
import '../../../styles/Crud.css';

export default function TableGame() {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);

  const fetchData = () => {
    gameService
      .getGames()
      .then((response) => {
        setGames(response.data.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  function deleteGame(id) {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      gameService
        .deleteGame(id)
        .then((response) => setGames(games.filter((game) => game.id !== id)))
        .catch((error) => console.log(error.data.message));
    }
  }

  return (
    <div className='container-fluid'>
      <h1>Игры</h1>
      <Link className='btn btn-primary mb-2' to='create'>
        Добавить новую запись
      </Link>
      <table className='table table-bordered'>
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
                <td>{game.name}</td>
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
                    className='btn btn-danger me-1'
                    onClick={() => deleteGame(game.id)}
                  >
                    <i class='bi-trash-fill' />
                  </button>
                  <Link className='btn btn-warning' to={`edit/${game.id}`}>
                    <i class='bi-pencil-square' />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
