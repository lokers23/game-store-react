import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { keyService } from '../../../services/KeyService';
import { gameService } from '../../../services/GameService';
import { InlineError } from '../../InlineError';
import '../../../styles/admin-form.css';

export default function CreateKey() {
  const [games, setGames] = useState([]);
  const [errors, setErrors] = useState([]);

  const [value, setValue] = useState('');
  const [gameId, setGameId] = useState(null);
  const [isUsed, setIsUsed] = useState(false);

  const navigate = useNavigate();

  const fetchData = () => {
    gameService
      .getGames()
      .then((response) => setGames(response.data.data))
      .catch((error) => console.log(error.message));
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
        isUsed: isUsed
      })
      .then((response) => {
        navigate('..');
      })
      .catch((error) => setErrors(error.response.data.errors));
  }

  return (
    <div className='container-fluid mb-5'>
      <h2 className='mb-2'>Добавить новый ключ</h2>
      <form
        className='d-flex flex-column'
        onSubmit={handleSubmit}
        style={{ maxWidth: '500px' }}
      >
        <InlineError field='Key' errors={errors} />
        <InlineError field='value' errors={errors} />
        <label className='form-label'>
          Значение:
          <input
            className='form-control'
            type='text'
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </label>
        <InlineError field='gameId' errors={errors} />

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

        <InlineError field='isUsed' errors={errors} />
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            value={isUsed}
            onChange={(event) => setIsUsed(event.target.checked)}
          />
          <label className='form-check-label'>Использованный?</label>
        </div>

        <button className='btn btn-sm submit-button mb-2' type='submit'>
          Отправить
        </button>
        <Link className='btn btn-sm back-button m-0' to='..'>
          Назад
        </Link>
      </form>
    </div>
  );
}
