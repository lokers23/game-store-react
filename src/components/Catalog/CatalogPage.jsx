import { useCallback, useEffect, useState } from 'react';
import { gameService } from '../../services/GameService';
import { Link } from 'react-router-dom';
import CatalogSortPanel from './CatalogSortPanel';
import CatalogFilterPanel from './CatalogFilterPanel';
import Pagination from '../Pagination/Pagination';

function CatalogPage() {
  const [games, setGames] = useState([]);

  const [sort, setSort] = useState(null);
  const [filter, setFilter] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(3);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  function handleSortChange(sort) {
    setPage(1);
    setSort(sort);
  }

  const handleFilterChange = useCallback((objectFilter) => {
    let newFilter = '';
    for (const [key, value] of Object.entries(objectFilter)) {
      if (value !== null) {
        newFilter += `${key}=${value}&`;
      }
    }

    setPage(1);
    setFilter(newFilter.slice(0, -1));
  }, []);

  const handlePageChange = (value) => {
    setPage(value);
  };

  const getGames = useCallback(() => {
    gameService
      .getGames(page, pageSize, sort, filter)
      .then((response) => {
        setGames(response.data.data);
        setHasNextPage(response.data.hasNextPage);
        setHasPreviousPage(response.data.hasPreviousPage);
      })
      .catch();
  }, [sort, filter, page, pageSize]);

  useEffect(() => {
    getGames();
  }, [getGames]);

  return (
    <div
      className='container-fluid d-flex mx-auto p-2 mb-5'
      style={{ maxWidth: '1200px' }}
    >
      <CatalogFilterPanel onFilterChange={handleFilterChange} />

      <div className='' style={{ maxWidth: '720px' }}>
        <CatalogSortPanel onSortChange={handleSortChange} />

        {games.length > 0 &&
          games.map((game) => (
            <Link
              key={game.id}
              to={`/game/${game.id}`}
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
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        <Pagination
          page={page}
          onChange={handlePageChange}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
        />
      </div>
    </div>
  );
}

export default CatalogPage;
