import { useEffect, useState } from 'react';
import '../../../styles/Center.css';
import { Link, useNavigate } from 'react-router-dom';
import { gameService } from '../../../services/GameService';

function Center() {
  const navigate = useNavigate();
  const [gamesOrderById, setGamesOrderById] = useState([]);
  const [gamesOrderByDate, setGamesOrderByDate] = useState([]);

  const fetchData = () => {
    const sortIdDesc = 'id_desc';
    const sortDateDesc = 'date_desc';
    gameService
      .getGames(1, 4, sortIdDesc)
      .then((response) => setGamesOrderById(response.data.data))
      .catch((error) => console.log(error));

    gameService
      .getGames(1, 4, sortDateDesc)
      .then((response) => setGamesOrderByDate(response.data.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  return (
    <div className='' style={{ maxWidth: '720px' }}>
      <div className='d-flex flex-column'>
        <ul
          className='nav nav-pills mb-3 fw-bold'
          id='pills-tab'
          role='tablist'
        >
          <li
            className='nav-item border border-dark rounded-3 shadow-sm  border me-4'
            role='presentation'
          >
            <button
              className='nav-link active'
              style={{ minWidth: '150px' }}
              data-bs-toggle='pill'
              id='pills-catalog-tab'
              data-bs-target='#pills-catalog'
              role='tab'
              aria-controls='pills-catalog'
              aria-selected='true'
            >
              Каталог
            </button>
          </li>
          <li
            className='nav-item border rounded-3 me-3 shadow-sm border-dark'
            role='presentation'
          >
            <button
              className='nav-link'
              style={{ minWidth: '150px' }}
              data-bs-toggle='pill'
              id='pills-new-tab'
              data-bs-target='#pills-new'
              role='tab'
              aria-controls='pills-new'
              aria-selected='false'
            >
              Новые
            </button>
          </li>
        </ul>
      </div>
      <div className='tab-content' id='pills-tabContent'>
        <div
          className='tab-pane fade show active'
          role='tabpanel'
          id='pills-catalog'
          aria-labelledby='pills-catalog-tab'
        >
          {gamesOrderById.length > 0 &&
            gamesOrderById.map((game) => (
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
                            game.genres.slice(0, 3).map((genre) => (
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
                              game.minimumSpecifications
                                .slice(0, 2)
                                .map((minSpec) => (
                                  <span
                                    key={minSpec.id}
                                    className='badge bg-secondary me-2 p-2'
                                    style={{ fontSize: '13px', padding: '3px' }}
                                  >
                                    {minSpec.platform.name}
                                  </span>
                                ))}
                            <span className='badge bg-secondary p-2'>
                              {game.activation && game.activation.name}
                            </span>
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
        <div
          className='tab-pane fade'
          role='tabpanel'
          id='pills-new'
          aria-labelledby='pills-new-tab'
        >
          {gamesOrderByDate.length > 0 &&
            gamesOrderByDate.map((game) => (
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
                            game.genres.slice(0, 3).map((genre) => (
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
                              game.minimumSpecifications
                                .slice(0, 2)
                                .map((minSpec) => (
                                  <span
                                    key={minSpec.id}
                                    className='badge bg-secondary me-2 p-2'
                                    style={{ fontSize: '13px', padding: '3px' }}
                                  >
                                    {minSpec.platform.name}
                                  </span>
                                ))}
                            <span className='badge bg-secondary p-2'>
                              {game.activation && game.activation.name}
                            </span>
                          </div>
                        </div>
                        <span className='fw-bold border-1 border-dark d-flex justify-content-end'>
                          Цена: ${game.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Center;
