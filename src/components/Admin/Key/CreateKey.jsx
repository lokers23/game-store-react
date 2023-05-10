import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { keyService } from '../../../services/KeyService';
import { activationService } from '../../../services/ActivationService';
import { gameService } from '../../../services/GameService';

export default function CreateKey() {
  const [activations, setActivations] = useState([]);
  const [games, setGames] = useState([]);

  const [value, setValue] = useState('');
  const [gameId, setGameId] = useState(0);
  const [activationId, setActivationId] = useState(0);
  const [isUsed, setIsUsed] = useState(false);

  const navigate = useNavigate();

  const fetchData = () => {
    activationService
      .getActivations()
      .then((response) => setActivations(response.data.data))
      .catch((error) => console.log(error));

    gameService
      .getGames()
      .then((response) => setGames(response.data.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  function handleSubmit(event) {
    event.preventDefault();

    keyService
      .saveKey(0, {
        value: value,
        gameId: gameId,
        activationId: activationId,
        isUsed: isUsed
      })
      .then((response) => {
        navigate('..');
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>Добавить новый ключ</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Значение:
          <input
            type='text'
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </label>
        <label>
          Игра:
          <select
            size='1'
            onChange={(event) => setGameId(Number(event.target.value))}
          >
            {!gameId && <option value=''>Выберите игру</option>}
            {games.length > 0 &&
              games.map((game) => (
                <option key={game.id} value={game.id} datatype='number'>
                  {game.name}
                </option>
              ))}
          </select>
        </label>

        <label>
          Активация:
          <select
            size='1'
            onChange={(event) => setActivationId(Number(event.target.value))}
          >
            {!activationId && (
              <option value=''>Выберите площадку для активации</option>
            )}
            {activations.length > 0 &&
              activations.map((activation) => (
                <option
                  key={activation.id}
                  value={activation.id}
                  datatype='number'
                >
                  {activation.name}
                </option>
              ))}
          </select>
        </label>

        <label>
          Использованный?:
          <input
            type='checkbox'
            value={isUsed}
            onChange={(event) => setIsUsed(event.target.checked)}
          />
        </label>

        <button type='submit'>Отправить</button>
      </form>

      <Link to='..'>Назад</Link>
    </div>
  );
}
