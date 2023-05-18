import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gameService } from '../../../services/GameService';
import { Link } from 'react-router-dom';
import '../../../styles/carousel-game.css';
import '../../../styles/min-spec.css';
import AlertAddCart from '../../Alerts/AlertAddCart';

function GamePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [game, setGame] = useState([]);
  const [textAlert, setTextAlert] = useState('');

  const fetchData = () => {
    gameService
      .getGameById(id)
      .then((response) => {
        setGame(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

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
    <div className='d-flex'>
      <div className=' mx-auto' style={{ maxWidth: '1200px' }}>
        <h2 className='p-3 shadow bg-white border rounded mb-3'>{game.name}</h2>
        <div className='d-flex flex-row mb-3'>
          <div className='container-fluid carousel-game p-2 me-3 shadow border rounded'>
            <div
              id='carouselExampleFade'
              className='carousel slide carousel-fade'
              data-bs-ride='carousel'
            >
              <div className='carousel-inner'>
                <div className='carousel-item active'>
                  <img
                    className='d-block w-100'
                    src={gameService.getAvatarUrl(
                      'Resident Evil 4-2023-04-18.jpg'
                    )}
                    alt={game.avatarName}
                  ></img>
                </div>
                <div className='carousel-item'>
                  <img
                    className='d-block w-100'
                    src={gameService.getAvatarUrl(
                      'Darkest Dungeon II-2023-05-10.jpg'
                    )}
                    alt={game.avatarName}
                  ></img>
                </div>
              </div>
              <button
                className='carousel-control-prev'
                type='button'
                data-bs-target='#carouselExampleFade'
                data-bs-slide='prev'
              >
                <span
                  className='carousel-control-prev-icon'
                  aria-hidden='true'
                ></span>
                <span className='visually-hidden'>Previous</span>
              </button>
              <button
                className='carousel-control-next'
                type='button'
                data-bs-target='#carouselExampleFade'
                data-bs-slide='next'
              >
                <span
                  className='carousel-control-next-icon'
                  aria-hidden='true'
                ></span>
                <span className='visually-hidden'>Next</span>
              </button>
            </div>
          </div>

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
                      {index !== game.minimumSpecifications.length - 1
                        ? ', '
                        : ''}
                    </span>
                  ))}
              </p>
              <p>
                <b>Активация: </b>
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
        </div>
        <div
          className='p-2 mb-3 shadow bg-white rounded border'
          style={{ minHeight: '300px' }}
        >
          <ul className='nav nav-tabs mb-3' id='tabs1'>
            <li className='nav-item' role='presentation'>
              <button
                className='nav-link active text-black-50 fw-bold'
                data-bs-toggle='tab'
                id='description-tab'
                data-bs-target='#description'
                role='tab'
                aria-controls='description'
                aria-selected='true'
              >
                Описание
              </button>
            </li>
            <li className='nav-item' role='presentation'>
              <button
                className='nav-link text-black-50 fw-bold'
                data-bs-toggle='tab'
                id='system-tab'
                data-bs-target='#system'
                role='tab'
                aria-controls='system'
                aria-selected='true'
              >
                Системные требования
              </button>
            </li>
          </ul>
          <div className='tab-content'>
            <div
              className='tab-pane fade show active'
              role='tabpanel'
              id='description'
              aria-labelledby='description-tab'
            >
              {game.description}
            </div>
            <div
              className='tab-pane fade show'
              role='tabpanel'
              id='system'
              aria-labelledby='system-tab'
            >
              <div className='d-flex flex-column'>
                <ul
                  className='nav nav-pills mb-3 mx-auto fw-bold'
                  id='pills-tab'
                  role='tablist'
                >
                  {game.minimumSpecifications &&
                    game.minimumSpecifications.length > 0 &&
                    game.minimumSpecifications.map((minSpec, index) => (
                      <li
                        key={minSpec.id}
                        className='nav-item border rounded-3 border-primary me-3'
                        role='presentation'
                      >
                        <button
                          className={`nav-link ${index === 0 && 'active'}`}
                          data-bs-toggle='pill'
                          id={`pills-${minSpec.platform.name}-tab`}
                          data-bs-target={`#pills-${minSpec.platform.name}`}
                          role='tab'
                          aria-controls={`pills-${minSpec.platform.name}`}
                          aria-selected='true'
                        >
                          {minSpec.platform.name}
                        </button>
                      </li>
                    ))}
                </ul>
                <div
                  className='tab-content mx-auto p-2 w-25 border-min-spec rounded bg-min-spec'
                  id='pills-tabContent'
                >
                  {game.minimumSpecifications &&
                    game.minimumSpecifications.length > 0 &&
                    game.minimumSpecifications.map((minSpec, index) => (
                      <div
                        key={minSpec.id}
                        className={`tab-pane fade show ${
                          index === 0 && 'active'
                        }`}
                        role='tabpanel'
                        id={`pills-${minSpec.platform.name}`}
                        aria-labelledby={`pills-${minSpec.platform.name}-tab`}
                      >
                        <p>
                          <b>ОС:</b> {minSpec.operatingSystem}
                        </p>
                        <p>
                          <b>Процессор:</b> {minSpec.processor}
                        </p>
                        <p>
                          <b>Оперативная память:</b> {minSpec.memory}
                        </p>
                        <p>
                          <b>Графика:</b> {minSpec.graphics}
                        </p>
                        <p>
                          <b>Место на диске:</b> {minSpec.storage}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamePage;
