import { useCallback, useEffect, useState } from 'react';
import { genreService } from '../../services/GenreService';
import { activationService } from '../../services/ActivationService';
import { platformService } from '../../services/PlatformService';
import { useParams } from 'react-router-dom';

function CatalogFilterPanel({ onFilterChange }) {
  const {
    genreFilterId = null,
    activationFilterId = null,
    searchFilter = null
  } = useParams();

  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [activations, setActivations] = useState([]);

  const [platformId, setPlatformId] = useState(null);
  const [genre, setGenre] = useState(genreFilterId);
  const [activationId, setActivationId] = useState(activationFilterId);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [name, setName] = useState(searchFilter);

  const getFilters = useCallback(() => {
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
  }, []);

  useEffect(() => {
    getFilters();
  }, [getFilters]);

  useEffect(() => {
    setName(searchFilter);
  }, [searchFilter]);

  useEffect(() => {
    onFilterChange({
      genre: genre,
      minPrice: minPrice,
      maxPrice: maxPrice,
      activationId: activationId,
      platformId: platformId,
      name: name
    });
  }, [
    genre,
    minPrice,
    maxPrice,
    platformId,
    activationId,
    name,
    onFilterChange
  ]);

  return (
    <div
      className='shadow border rounded me-3 p-2'
      style={{ maxWidth: '350px', minWidth: '250px', minHeight: '700px' }}
    >
      <input
        value={name === null ? '' : name}
        className='form-control mb-3'
        placeholder='Название игры'
        onChange={(event) => {
          const value =
            event.target.value === 'null' ? null : event.target.value;
          setName(value);
        }}
      />
      <h6>Жанр:</h6>
      <select
        className='form-select mb-3'
        size='1'
        name='genres'
        value={genre === null ? '' : genre}
        onChange={(event) => {
          const value =
            event.target.value === 'null' ? null : event.target.value;
          setGenre(value);
        }}
      >
        <option key={0} value={'null'}>
          Все
        </option>
        {genres.length > 0 &&
          genres.map((genre) => (
            <option key={genre.id} value={genre.name} datatype='number'>
              {genre.name}
            </option>
          ))}
      </select>

      <h6>Платформа:</h6>
      <select
        className='form-select mb-3'
        size='1'
        name='platforms'
        onChange={(event) => {
          const value =
            event.target.value === 'null' ? null : event.target.value;
          setPlatformId(value);
        }}
      >
        <option key={0} value={'null'}>
          Все
        </option>
        {platforms.length > 0 &&
          platforms.map((platform) => (
            <option key={platform.id} value={platform.id} datatype='number'>
              {platform.name}
            </option>
          ))}
      </select>

      <h6>Активация:</h6>
      <select
        className='form-select mb-3'
        size='1'
        name='platforms'
        value={activationId === null ? '' : activationId}
        onChange={(event) => {
          const value =
            event.target.value === 'null' ? null : event.target.value;
          setActivationId(value);
        }}
        required
      >
        <option key={0} value={'null'}>
          Все
        </option>
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
