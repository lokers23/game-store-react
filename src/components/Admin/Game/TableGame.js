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
    <div>
      <h1>Жанры</h1>
      <Link to='create'>Добавить новую запись</Link>
      <table>
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
            <th scope='col'>Минимальная спецификация</th>
            <th scope='col'></th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {games.length > 0 &&
            games.map((game) => (
              <tr key={game.id}>
                <td>{game.id}</td>
                <td>{game.name}</td>
                <td>{'developer' in game && game.developer.name}</td>
                <td>Издатель</td>
                <td>{game.description}</td>
                <td>{game.releaseOn}</td>
                <td>{game.price}</td>
                <td>видео</td>
                <td>аватар</td>
                <td>жанры</td>
                <td>мин спецификация</td>
                <td>
                  <button onClick={() => deleteGame(game.id)}>Удалить</button>
                </td>
                <td>
                  <Link to={`edit/${game.id}`}> Редактировать</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
