import { useEffect, useState } from 'react';
import { gameService } from '../../services/GameService';

function Cart() {
  const [games, setGames] = useState(
    JSON.parse(localStorage.getItem('cartGames'))
  );

  useEffect(() => {
    localStorage.setItem('cartGames', JSON.stringify(games));
  }, [games]);

  function increaseCount(e, id, count) {
    e.preventDefault();
    const newGames = games.map((game) => {
      if (game.id === id) {
        return { ...game, count: game.count + count };
      } else {
        return game;
      }
    });

    setGames(newGames);
    localStorage.setItem('cartGames', JSON.stringify(games));
  }

  function decreaseCount(e, id, count) {
    e.preventDefault();
    const newGames = games.map((game) => {
      if (game.id === id) {
        return { ...game, count: game.count - count };
      } else {
        return game;
      }
    });

    localStorage.setItem('cartGames', JSON.stringify(newGames));
    setGames(newGames);
  }

  const totalPrice =
    games !== null
      ? games.reduce(function (sum, game) {
          return sum + game.price;
        }, 0)
      : 0;
  const [fullPrice, setFullPrice] = useState(totalPrice.toFixed(2));
  return (
    <div className='container'>
      {games !== null && games.length > 0 ? (
        <div className='w-75 mx-auto'>
          <h1>Оформление заказа</h1>
          <div>
            {games.map((game) => (
              <div className='card mb-3' key={game.id}>
                <div className='row g-0'>
                  <div className='col-md-4'>
                    <img
                      className='img-fluid rounded-start'
                      src={gameService.getAvatarUrl(game.avatar)}
                      alt={game.avatarName}
                    ></img>
                  </div>
                  <div className='col-md-8'>
                    <div className='card-body d-flex flex-column'>
                      <div className=''>
                        <h5 className='card-title'>{game.name}</h5>
                        <p className='card-text'>
                          <small className='text-muted'>
                            Активировать продукт можно только на ...
                          </small>
                        </p>
                      </div>

                      <div className='d-flex justify-content-end align-items-center'>
                        <button
                          type='button'
                          className='btn p-0 btn-default'
                          onClick={(e) => decreaseCount(e, game.id, 1)}
                        >
                          <span className='bi-dash-square fs-4'></span>
                        </button>
                        <input
                          value={game.count}
                          min={0}
                          max={5}
                          className='form-control-sm mx-2 text-center'
                          style={{ width: '30px', height: '30px' }}
                          readOnly
                        />
                        <button
                          className='btn p-0  btn-default'
                          onClick={(e) => increaseCount(e, game.id, 1)}
                        >
                          <i className='bi bi-plus-square fs-4'></i>
                        </button>

                        <span className='ms-2 text-center row g-0 justify-content-center  flex-column fw-bold'>
                          {game.price}$
                        </span>

                        <button className='btn p-0 ms-5 btn-default '>
                          <i className='bi bi-x fs-4 text-danger'></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <p className='fw-bold text-end'>Итоговая стоимость: 1000000$</p>
            <button className='btn btn-primary'>Подтвердить покупку</button>
          </div>
        </div>
      ) : (
        <h1 className='display-2 text-center fw-50'>Ваша корзина пуста</h1>
      )}
    </div>

    // <div className='cards-content'>
    //   <div className='cards'>
    //     {games.length > 0 &&
    //       games.map((game) => (
    //         <div key={game.id} className='card'>
    //           <h2>{game.name}</h2>
    //           <img
    //             src={gameService.getAvatarUrl(game.avatar)}
    //             alt={game.avatar}
    //             className='main-image'
    //           ></img>
    //           <div className='count-game-box'>
    //             <div className='plus' onClick={console.log('+')}>
    //               +
    //             </div>
    //             <input type='text' value='0' readOnly />
    //             <div className='btn' onClick={console.log('+')}>
    //               -
    //             </div>
    //           </div>
    //           <p className='price'>Цена: {game.price}$</p>
    //         </div>
    //       ))}
    //   </div>
    //   <p>Полная стоимость: {fullPrice}$</p>
    // </div>
  );
}

export default Cart;
