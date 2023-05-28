import { useEffect, useState } from 'react';
import { activationService } from '../../../services/ActivationService';
import { genreService } from '../../../services/GenreService';
import { Link } from 'react-router-dom';

function LeftMenu() {
  const [activations, setActivations] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    activationService
      .getActivations()
      .then((response) => setActivations(response.data.data))
      .catch();

    genreService
      .getGenres()
      .then((response) => setGenres(response.data.data))
      .catch();
  }, []);

  return (
    <div
      className='p-2 shadow border rounded me-3'
      style={{ maxWidth: '300px', minWidth: '200px', minHeight: '1000px' }}
    >
      <div className='mb-4'>
        <div className=' fw-bold mb-2'>
          <i className='bi-boxes me-1 text-dark'></i>
          РАЗДЕЛЫ
        </div>

        <ul className='ps-4' style={{ listStyleType: 'none' }}>
          {activations.length > 0 &&
            activations.map((activation) => (
              <li key={activation.id} className='mb-2'>
                <Link
                  to={`/catalog/activation/${activation.id}`}
                  className='text-dark'
                  style={{ textDecoration: 'none' }}
                >
                  {activation.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <div>
        <div className='fw-bold mb-2'>
          <i className='bi-boxes me-1 text-dark'></i>
          ЖАНРЫ
        </div>
        <ul className='ps-4' style={{ listStyleType: 'none' }}>
          {genres.length > 0 &&
            genres.map((genre) => (
              <li key={genre.id} className='mb-2'>
                <Link
                  to={`/catalog/genre/${genre.name}`}
                  className='text-dark'
                  style={{ textDecoration: 'none' }}
                >
                  {genre.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default LeftMenu;
