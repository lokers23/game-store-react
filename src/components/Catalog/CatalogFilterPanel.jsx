import { useEffect, useState } from 'react';
import { genreService } from '../../services/GenreService';
import { activationService } from '../../services/ActivationService';
import { platformService } from '../../services/PlatformService';

function CatalogFilterPanel({ onFilterChange }) {
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [activations, setActivations] = useState([]);

  const [platformId, setPlatformId] = useState(0);
  const [genre, setGenre] = useState('');
  const [activationId, setActivationId] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  function onGenreChange(event) {
    event.preventDefault();
    setGenre(event.target.value);
  }

  useEffect(() => {
    genreService
      .getGenres()
      .then((response) => setGenres(response.data.data))
      .catch();

    activationService
      .getActivations()
      .then((response) => setActivations(response.data.data))
      .catch();

    platformService
      .getPlatforms()
      .then((response) => setPlatforms(response.data.data))
      .catch();

    onFilterChange(genre, minPrice, maxPrice, activationId, platformId);
  }, [genre, minPrice, maxPrice, platformId, activationId]);

  return (
    <div
      className='shadow border rounded me-3 p-2'
      style={{ maxWidth: '300px', minWidth: '200px' }}
    >
      <h5>Фильтры</h5>
      <select
        className='form-select mb-2'
        size='1'
        name='genres'
        onChange={(event) => onGenreChange(event)}
        required
      >
        {!genre && <option value=''>Выберите жанр</option>}

        {genres.length > 0 &&
          genres.map((genre) => (
            <option key={genre.id} value={genre.name} datatype='number'>
              {genre.name}
            </option>
          ))}
      </select>

      <select
        className='form-select mb-2'
        size='1'
        name='platforms'
        onChange={(event) => setPlatformId(Number(event.target.value))}
        required
      >
        {!platformId && <option value=''>Выберите платформу</option>}

        {platforms.length > 0 &&
          platforms.map((platform) => (
            <option key={platform.id} value={platform.id} datatype='number'>
              {platform.name}
            </option>
          ))}
      </select>

      <select
        className='form-select mb-2'
        size='1'
        name='platforms'
        onChange={(event) => setActivationId(event.target.value)}
        required
      >
        {!activationId && <option value=''>Выберите активацию</option>}

        {activations.length > 0 &&
          activations.map((activation) => (
            <option key={activation.id} value={activation.id} datatype='number'>
              {activation.name}
            </option>
          ))}
      </select>
      <div className='border-top'>
        <h6>Цена($):</h6>
        <div className='d-flex align-items-center justify-content-center'>
          <p className='m-0 p-0 me-2'>Между</p>
          <input
            className='form-control me-2  text-center'
            type='number'
            min='0'
            value={minPrice}
            style={{ maxWidth: '60px', maxHeight: '35px' }}
            onChange={(event) => setMinPrice(event.target.value)}
          />
          <p className='m-0 p-0 me-2'>и</p>
          <input
            className='form-control text-center'
            type='number'
            min='0'
            value={maxPrice}
            style={{ maxWidth: '60px', maxHeight: '35px' }}
            onChange={(event) => setMaxPrice(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default CatalogFilterPanel;
