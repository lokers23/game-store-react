import { useState } from 'react';

function SideBody({ game }) {
  const [textAlert, setTextAlert] = useState('');
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
      }
    } else {
      storedGames = [newGame];
    }

    localStorage.setItem('cartGames', JSON.stringify(storedGames));
    setTextAlert(`${game.name} добавлен в корзину!`);
  }
  return (
    <div className='d-flex flex-column' style={{ minWidth: '350px' }}>
      <div className='d-flex fw-bold fs-3 mb-3 p-3 shadow rounded border justify-content-between'>
        <p className='my-auto me-3'>Цена: ${game.price}</p>
        <button
          className=' btn btn-lg '
          style={{ backgroundColor: '#0081B4', color: 'white' }}
          onClick={(event) => addToCart(event, game)}
        >
          В корзину
        </button>
      </div>
      <div className='p-3 shadow rounded border  flex-grow-1'>
        <p>
          <b>Платформа: </b>
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
          <b>Активация: </b>
          {game.activation && game.activation.name}
        </p>
        <p className=''>
          <b>Жанр: </b>
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
          <b>Издатель: </b>
          {game.publisher && game.publisher.name}
        </p>
        <p>
          <b>Разработчик: </b>
          {game.developer && game.developer.name}
        </p>
        <p>
          <b>Дата выхода: </b>
          {game.releaseOn}
        </p>
        <p>
          <b>Наличие: много</b>
        </p>
      </div>
    </div>
  );
}

export default SideBody;
