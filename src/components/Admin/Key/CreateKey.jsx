import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { keyService } from '../../../services/KeyService';
import { activationService } from '../../../services/ActivationService';
import { gameService } from '../../../services/GameService';

export default function CreateKey() {
  //const [activations, setActivations] = useState([]);
  const [games, setGames] = useState([]);

  const [value, setValue] = useState('');
  const [gameId, setGameId] = useState(0);
  // const [activationId, setActivationId] = useState(0);
  const [isUsed, setIsUsed] = useState(false);

  const navigate = useNavigate();

  const fetchData = () => {
    // activationService
    //   .getActivations()
    //   .then((response) => setActivations(response.data.data))
    //   .catch((error) => console.log(error));

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
        //activationId: activationId,
        isUsed: isUsed
      })
      .then((response) => {
        navigate('..');
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className='container-fluid'>
      <h2 className='mb-2'>Добавить новый ключ</h2>
      <form
        className='d-flex flex-column'
        onSubmit={handleSubmit}
        style={{ maxWidth: '500px' }}
      >
        <label className='form-label'>
          Значение:
          <input
            className='form-control'
            type='text'
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </label>
        <label className='form-label'>
          Игра:
          <select
            className='form-select'
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

        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            value={isUsed}
            onChange={(event) => setIsUsed(event.target.checked)}
          />
          <label className='form-check-label'>Использованный?</label>
        </div>

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
