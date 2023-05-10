import { useEffect, useState } from 'react';
import { gameService } from '../../services/GameService';

function Cart() {
  const [games, setGames] = useState(
    JSON.parse(localStorage.getItem('cartGames'))
  );
  const totalPrice = games.reduce(function (sum, game) {
    return sum + game.price;
  }, 0);
  const [fullPrice, setFullPrice] = useState(totalPrice.toFixed(2));
  return (
    <div className='cards-content'>
      <div className='cards'>
        {games.length > 0 &&
          games.map((game) => (
            <div key={game.id} className='card'>
              <h2>{game.name}</h2>
              <img
                src={gameService.getAvatarUrl(game.avatar)}
                alt={game.avatar}
                className='main-image'
              ></img>
              <p className='price'>Цена: {game.price}$</p>
            </div>
          ))}
      </div>
      <p>Полная стоимость: {fullPrice}$</p>
    </div>
  );
}

export default Cart;
