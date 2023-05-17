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
    <div className=' mx-auto' style={{ maxWidth: '800px' }}>
      {games.length > 0 &&
        games.map((game) => (
          <div
            className='card border border-2 mb-3 p-1 shadow bg-white rounded'
            key={game.id}
          >
            <div className='row no-gutters'>
              <div className='col-5  my-auto'>
                <img
                  className='card-img'
                  src={gameService.getAvatarUrl(game.avatarName)}
                  alt={game.avatarName}
                ></img>
              </div>
              <div className='col-7'>
                <div className='card-body'>
                  <Link
                    to={`edit/${game.id}`}
                    className=''
                    style={{
                      textDecoration: 'none',
                      color: 'black'
                    }}
                  >
                    <h5 className='card-title'>{game.name}</h5>
                  </Link>

                  <div className='d-flex mb-2'>
                    {game.genres.length > 0 &&
                      game.genres.map((genre) => (
                        <div className='border border-2 border-light me-2 shadow-sm bg-white rounded'>
                          <p
                            className='my-auto fw-normal'
                            style={{ fontSize: '13px', padding: '3px' }}
                          >
                            {genre.name}
                          </p>
                        </div>
                      ))}
                  </div>
                  <div className='d-flex justify-content-between'>
                    <div className='d-flex'>
                      <p className='border border-2 border-light me-2 shadow-sm bg-white rounded'>
                        {new Date(game.releaseOn).getFullYear()}
                      </p>
                      {game.minimumSpecifications.length > 0 &&
                        game.minimumSpecifications.map((minSpec) => (
                          <p className='border border-2 border-light me-2 shadow-sm bg-white rounded'>
                            {minSpec.platform.name}
                          </p>
                        ))}
                    </div>
                    <p className='p-1 fw-bold border-bottom border-1 border-dark'>
                      Цена: ${game.price}
                    </p>
                  </div>
                  <div>
                    <button
                      className='btn btn-sm'
                      onClick={(event) => addToCart(event, game)}
                      style={{ backgroundColor: '#0081B4', color: 'white' }}
                    >
                      В корзину
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Center;
