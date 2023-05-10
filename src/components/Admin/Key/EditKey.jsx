import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { keyService } from '../../../services/KeyService';
import { activationService } from '../../../services/ActivationService';
import { gameService } from '../../../services/GameService';

export default function EditKey() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activations, setActivations] = useState([]);
  const [games, setGames] = useState([]);

  const [value, setValue] = useState('');
  const [gameId, setGameId] = useState(0);
  const [activationId, setActivationId] = useState(0);
  const [isUsed, setIsUsed] = useState(false);

  const fetchData = () => {
    activationService
      .getActivations()
      .then((response) => setActivations(response.data.data))
      .catch((error) => console.log(error));

    gameService
      .getGames()
      .then((response) => setGames(response.data.data))
      .catch((error) => console.log(error));

    keyService
      .getKeyById(id)
      .then((response) => {
        const data = response.data.data;
        setActivationId(data.activation.id);
        setValue(data.value);
        if (data.game) {
          setGameId(data.game.id);
        }
        setIsUsed(data.isUsed);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  function handleSubmit(event) {
    event.preventDefault();

    keyService
      .saveKey(id, {
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
      <h1>Редактировать ключ</h1>
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
            value={gameId}
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
            value={activationId}
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
          Использованный:
          <input
            type='checkbox'
            checked={isUsed}
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
