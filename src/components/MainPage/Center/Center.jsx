import { useEffect, useState } from 'react';
import '../../../styles/Center.css';
import { Link, json, useNavigate } from 'react-router-dom';
import { gameService } from '../../../services/GameService';
import { Card, CardImg, Col, Container, Row, Button } from 'react-bootstrap';

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
    <div className='' style={{ maxWidth: '720px' }}>
      <div className='d-flex flex-row  mb-3'>
        <div className='shadow border rounded p-2 px-5 me-3'>Каталог</div>
        <div className='shadow border rounded p-2 px-5'>Новые</div>
      </div>
      {games.length > 0 &&
        games.map((game) => (
          <Link
            key={game.id}
            to={`game/${game.id}`}
            className=''
            style={{
              textDecoration: 'none',
              color: 'black'
            }}
          >
            <div className='card mb-3 shadow bg-white rounded-2'>
              <div className='row g-0'>
                <div
                  className='col-lg-5 my-auto'
                  style={{
                    objectFit: 'cover'
                  }}
                >
                  <img
                    className='img-fluid'
                    src={gameService.getAvatarUrl(game.avatarName)}
                    style={{ minWidth: '292px' }}
                    alt={game.avatarName}
                  ></img>
                </div>
                <div className='col-lg-7'>
                  <div className='card-body'>
                    <h5 className='card-title'>{game.name}</h5>

                    <div className='mb-2'>
                      {game.genres.length > 0 &&
                        game.genres.map((genre) => (
                          <span
                            key={genre.id}
                            className='badge bg-dark me-2 p-2'
                          >
                            {genre.name}
                          </span>
                        ))}
                    </div>
                    <div className='d-flex justify-content-between'>
                      <div className='d-flex'>
                        <span className='badge bg-secondary me-2 p-2'>
                          {new Date(game.releaseOn).getFullYear()}
                        </span>
                        {game.minimumSpecifications.length > 0 &&
                          game.minimumSpecifications.map((minSpec) => (
                            <span
                              key={minSpec.id}
                              className='badge bg-secondary me-2 p-2'
                              style={{ fontSize: '13px', padding: '3px' }}
                            >
                              {minSpec.platform.name}
                            </span>
                          ))}
                      </div>
                    </div>
                    <span className='fw-bold border-1 border-dark d-flex justify-content-end'>
                      Цена: ${game.price}
                    </span>
                    {/* <div>
                    <button
                      className='btn btn-sm'
                      onClick={(event) => addToCart(event, game)}
                      style={{ backgroundColor: '#0081B4', color: 'white' }}
                    >
                      В корзину
                    </button>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default Center;
