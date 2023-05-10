import { useEffect, useState } from 'react';
import '../../../styles/Center.css';
import { json, useNavigate } from 'react-router-dom';
import { gameService } from '../../../services/GameService';

function Center() {
  const navigate = useNavigate();
  const [games, setGame] = useState([]);
  const fetchData = () => {
    gameService
      .getGames()
      .then((response) => setGame(response.data.data))
      .catch((error) => console.log(error));
  };

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
  }

  useEffect(() => {
    fetchData();
  }, [navigate]);

  return (
    <div className='center'>
      <div className='container'>
        {games.length > 0 &&
          games.map((game) => (
            <div key={game.id} className='card'>
              <img
                src={gameService.getAvatarUrl(game.avatarName)}
                alt={game.avatarName}
              ></img>
              <div className='body-content'>
                <div>
                  <h4>{game.name}</h4>
                </div>

                <div>
                  <ul>
                    {game.genres.length > 0 &&
                      game.genres
                        .slice(0, 2)
                        .map((genre) => <li key={genre.id}>{genre.name}</li>)}
                  </ul>
                </div>
                <div>
                  <p className='price'>Цена: {game.price}$</p>
                </div>
              </div>

              {/* <p>
                <button onClick={(event) => addToCart(event, game)}>
                  Добавить в корзину
                </button>
              </p> */}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Center;
