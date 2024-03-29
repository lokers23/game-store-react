import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { keyService } from '../../../services/KeyService';
import { gameService } from '../../../services/GameService';
import { InlineError } from '../../InlineError';
import '../../../styles/admin-form.css';

export default function EditKey() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);

  const [games, setGames] = useState([]);

  const [value, setValue] = useState('');
  const [gameId, setGameId] = useState(0);
  const [isUsed, setIsUsed] = useState(false);

  useEffect(() => {
    gameService
      .getGames()
      .then((response) => setGames(response.data.data))
      .catch((error) => console.log(error));

    keyService
      .getKeyById(id)
      .then((response) => {
        const data = response.data.data;
        setValue(data.value);
        if (data.game) {
          setGameId(data.game.id);
        }
        setIsUsed(data.isUsed);
      })
      .catch((error) => console.log(error));
  }, [navigate, id]);

  function handleSubmit(event) {
    event.preventDefault();

    keyService
      .saveKey(id, {
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
      <h2 className='mb-2'>Редактировать ключ</h2>
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

        <InlineError field='isUsed' errors={errors} />
        <label className='form-check form-check-label'>
          Использованный?
          <input
            className='form-check-input'
            type='checkbox'
            checked={isUsed}
            value={isUsed}
            onChange={(event) => setIsUsed(event.target.checked)}
          />
        </label>

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
