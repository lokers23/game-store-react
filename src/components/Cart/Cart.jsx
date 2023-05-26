import { useEffect, useState } from 'react';
import { gameService } from '../../services/GameService';
import { orderService } from '../../services/OrderService';
import InlineError from '../InlineError';
import { useCart } from '../../contexts/CartContext';

function Cart() {
  const { deleteItem, clearCart } = useCart();
  const [isReload, setIsReload] = useState(true);
  const [games, setGames] = useState(
    JSON.parse(localStorage.getItem('cartGames'))
  );

  const [errors, setErrors] = useState({});
  const [fullPrice, setFullPrice] = useState(0);

  useEffect(() => {
    localStorage.setItem('cartGames', JSON.stringify(games));
    if (games) {
      if (isReload) {
        updateDataGames(games);
      }
      setFullPrice(
        games.reduce((prev, curr) => prev + curr.price * curr.count, 0)
      );
    }

    //isReload возможно нужно будет удалить isReload из скобок
  }, [games, isReload]);

  function updateDataGames(newGames) {
    Promise.all(
      newGames.map((game) =>
        gameService.getGameById(game.id).then((response) => {
          const result = response.data.data;
          return {
            ...game,
            name: result.name,
            avatar: result.avatarName,
            price: result.price
          };
        })
      )
    )
      .then((newGames) => {
        setIsReload(false);
        setGames(newGames);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const gameCounts = games.map((game) => ({
      id: game.id,
      count: game.count
    }));

    orderService
      .saveOrder(0, { gameCounts: gameCounts })
      .then(() => {
        localStorage.removeItem('cartGames');
        setGames([]);
        clearCart();
      })
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

    updateDataGames(newGames);
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

    updateDataGames(newGames);
  }

  function removeItem(e, id) {
    e.preventDefault();

    const newGames = games.filter((game) => game.id !== id);
    updateDataGames(newGames);
    deleteItem();
  }

  return (
    <div className='container'>
      {games && games.length > 0 ? (
        <div className='mx-auto' style={{ maxWidth: '900px' }}>
          <div className='mb-3'>
            <p className='h2'>Оформление заказа</p>
          </div>
          <InlineError field='balance' errors={errors} />
          <div>
            <form onSubmit={handleSubmit}>
              <InlineError field='Game' errors={errors} />
              {games &&
                games.length &&
                games.map((game) => (
                  <div
                    className='card mb-4 shadow bg-white rounded'
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
                      <div className='col-md-4 p-3'>
                        <h5 className='card-title'>{game.name}</h5>
                        <p className='card-text'>
                          <small className='text-muted'>
                            Активировать продукт можно только на ...
                          </small>
                        </p>
                      </div>

                      <div className='col-md-2 d-flex justify-content-center align-items-center'>
                        <span
                          type='button'
                          className={
                            game.count <= 1 ? 'disabled text-black-50' : ''
                          }
                          onClick={(e) => {
                            if (game.count <= 1) return;
                            decreaseCount(e, game.id, 1);
                          }}
                        >
                          <span className='bi-dash-square fs-4'></span>
                        </span>
                        <input
                          value={game.count}
                          min='1'
                          max='5'
                          className='form-control-sm mx-2 text-center text-dark'
                          style={{ width: '30px', height: '30px' }}
                          readOnly
                        />
                        <span
                          className={
                            game.count >= 5 ? 'disabled text-black-50' : ''
                          }
                          onClick={(e) => {
                            if (game.count >= 5) return;
                            increaseCount(e, game.id, 1);
                          }}
                        >
                          <i className='bi bi-plus-square fs-4'></i>
                        </span>
                      </div>
                      <div className='fw-bold col-md-1 d-flex justify-content-center align-items-center'>
                        ${(game.price * game.count).toFixed(2)}
                      </div>

                      <div className='col-md-1 d-flex justify-content-center align-items-center'>
                        <button
                          onClick={(e) => removeItem(e, game.id)}
                          className='btn p-0 btn-default m-0'
                        >
                          <i className='bi bi-x fs-4 text-danger'></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              <p className='fw-bold text-end'>
                Итоговая стоимость: ${fullPrice.toFixed(2)}
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
