import { useEffect, useState } from 'react';
import { gameService } from '../../services/GameService';
import { orderService } from '../../services/OrderService';
import InlineError from '../InlineError';

function Cart() {
  const [games, setGames] = useState(
    JSON.parse(localStorage.getItem('cartGames'))
  );

  const [errors, setErrors] = useState({});

  const [fullPrice, setFullPrice] = useState(0);

  useEffect(() => {
    localStorage.setItem('cartGames', JSON.stringify(games));
  }, [games]);

  function handleSubmit(e) {
    e.preventDefault();
    const gameCounts = games.map((game) => ({
      id: game.id,
      count: game.count
    }));
    orderService
      .saveOrder(0, { gameCounts: gameCounts })
      .then(() => console.log('успешно'))
      .catch((error) => setErrors(error.response.data.errors));
  }

  function increaseCount(e, id, count) {
    e.preventDefault();
    const newGames = games.map((game) => {
      if (game.id === id && game.count < 5) {
        return { ...game, count: game.count + count };
      } else {
        return game;
      }
    });

    setGames(newGames);
    //localStorage.setItem('cartGames', JSON.stringify(games));
  }

  function decreaseCount(e, id, count) {
    e.preventDefault();
    const newGames = games.map((game) => {
      if (game.id === id && game.count > 1) {
        return { ...game, count: game.count - count };
      } else {
        return game;
      }
    });

    //localStorage.setItem('cartGames', JSON.stringify(newGames));
    setGames(newGames);
  }

  function removeItem(e, id) {
    e.preventDefault();
    const newGames = games.filter((game) => game.id !== id);
    setGames(newGames);
  }

  return (
    <div className='container'>
      {games !== null && games.length > 0 ? (
        <div className='w-75 mx-auto'>
          <div className='mb-3'>
            <p className='h2'>Оформление заказа</p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <InlineError field='Game' errors={errors} />
              {games.map((game) => (
                <div
                  className='card mb-4 p-1 shadow bg-white rounded'
                  key={game.id}
                >
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
                            min='1'
                            max='5'
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

                          <button
                            onClick={(e) => removeItem(e, game.id)}
                            className='btn p-0 ms-5 btn-default '
                          >
                            <i className='bi bi-x fs-4 text-danger'></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <p className='fw-bold text-end'>
                Итоговая стоимость: {fullPrice}$
              </p>

              <button className='btn btn-primary'>Подтвердить покупку</button>
            </form>
          </div>
        </div>
      ) : (
        <h1 className='display-2 text-center fw-50'>Ваша корзина пуста</h1>
      )}
    </div>
  );
}

export default Cart;
