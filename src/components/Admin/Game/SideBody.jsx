import { useEffect, useState } from 'react';
import { gameService } from '../../../services/GameService';
import { useCart } from '../../../contexts/CartContext';
import '../../../styles/game-page.css';

function SideBody({ game }) {
  const { addItem } = useCart();
  //const [textAlert, setTextAlert] = useState('');
  const [countKeys, setCountKeys] = useState(0);

  useEffect(() => {
    gameService
      .getNumberOfKeys(game.id)
      .then((response) => {
        if (response.data) {
          setCountKeys(response.data.data);
        } else {
          setCountKeys(0);
        }
      })
      .catch();
  }, [game]);

  function addToCart(event, game) {
    event.preventDefault();
    var newGame = {
      id: game.id,
      name: game.name,
      avatar: game.avatarName,
      price: game.price,
      count: 1
    };
    var storedGames = JSON.parse(localStorage.getItem('cartGames'));
    if (storedGames) {
      var gameIndex = storedGames.findIndex(function (game) {
        return game.id === newGame.id;
      });

      if (gameIndex !== -1) {
        storedGames[gameIndex].count++;
      } else {
        storedGames.push(newGame);
        addItem();
      }
    } else {
      storedGames = [newGame];
      addItem();
    }

    localStorage.setItem('cartGames', JSON.stringify(storedGames));
    //setTextAlert(`${game.name} добавлен в корзину!`);
  }

  return (
    <div className='d-flex flex-column' style={{ minWidth: '350px' }}>
      <div className='d-flex fw-bold fs-3 mb-3 p-3 shadow rounded border justify-content-between'>
        <p className='my-auto me-3'>
          Цена: ${game && Number(game.price).toFixed(2)}
        </p>
        <button
          className=' btn btn-lg buy-button'
          onClick={(event) => addToCart(event, game)}
        >
          В корзину
        </button>
      </div>
      <div className='p-3 shadow rounded border  flex-grow-1'>
        <p>
          <b className='me-2'>Платформа:</b>
          {game.minimumSpecifications &&
            game.minimumSpecifications.length > 0 &&
            game.minimumSpecifications.map((minSpec, index) => (
              <span key={minSpec.id}>
                {minSpec.platform.name}
                {index !== game.minimumSpecifications.length - 1 ? ', ' : ''}
              </span>
            ))}
        </p>
        <p>
          <b className='me-2'>Активация:</b>
          {game.activation && game.activation.name}
        </p>
        <p className=''>
          <b className='me-2'>Жанр:</b>
          {game.genres &&
            game.genres.length > 0 &&
            game.genres.map((genre, index) => (
              <span key={genre.id}>
                {genre.name}
                {index !== game.genres.length - 1 ? ', ' : ''}
              </span>
            ))}
        </p>
        <p>
          <b className='me-2'>Издатель:</b>
          {game.publisher && game.publisher.name}
        </p>
        <p>
          <b className='me-2'>Разработчик:</b>
          {game.developer && game.developer.name}
        </p>
        <p>
          <b className='me-2'>Дата выхода:</b>
          {new Date(game.releaseOn).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        <p className=''>
          <b className='me-2'>Наличие:</b>
          {countKeys === 0 && (
            <span className='text-danger fw-bold'> нет в наличии</span>
          )}
          {countKeys > 0 && countKeys <= 30 && (
            <span className='text-warning fw-bold'>мало</span>
          )}
          {countKeys > 30 && (
            <span className='text-success fw-bold'>много</span>
          )}
        </p>
      </div>
    </div>
  );
}

export default SideBody;
