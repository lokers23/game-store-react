import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { gameService } from '../../../services/GameService';
import { genreService } from '../../../services/GenreService';
import { developerService } from '../../../services/DeveloperService';
import { publisherService } from '../../../services/PublisherService';
import { minSpecificationService } from '../../../services/MinSpecificationService';
import { platformService } from '../../../services/PlatformService';
import { activationService } from '../../../services/ActivationService';
import '../../../styles/Crud.css';
import '../../../styles/min-spec.css';
import { InlineError } from '../../InlineError';

export default function CreateGame() {
  const [errors, setErrors] = useState([]);

  const formData = new FormData();
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [minSpecs, setMinSpecs] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [activations, setActivations] = useState([]);

  const [name, setName] = useState('');
  const [developerId, setDeveloperId] = useState(0);
  const [publisherId, setPublisherId] = useState(0);
  const [activationId, setActivationId] = useState(0);
  const [description, setDescription] = useState('');
  const [releaseOn, setReleaseOn] = useState(Date);
  const [price, setPrice] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [genreIds, setGenreIds] = useState([]);
  const [minimumSpecificationIds, setMinimumSpecificationIds] = useState({});
  const [avatar, setAvatar] = useState(null);

  const fetchData = () => {
    genreService
      .getGenres()
      .then((response) => setGenres(response.data.data))
      .catch((error) => error.message);

    developerService
      .getDevelopers()
      .then((response) => setDevelopers(response.data.data))
      .catch((error) => error.message);

    publisherService
      .getPublishers()
      .then((response) => setPublishers(response.data.data))
      .catch((error) => error.message);

    minSpecificationService
      .getMinSpecs()
      .then((response) => setMinSpecs(response.data.data))
      .catch((error) => error.message);

    platformService
      .getPlatforms()
      .then((response) => setPlatforms(response.data.data))
      .catch((error) => error.message);

    activationService
      .getActivations()
      .then((response) => setActivations(response.data.data))
      .catch((error) => error.message);
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  const handleImageChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleMinSpecIds = (platformName, selectedMinSpec) => {
    setMinimumSpecificationIds((prevState) => {
      if (selectedMinSpec) {
        return {
          ...prevState,
          [platformName]: selectedMinSpec
        };
      } else {
        const newState = { ...prevState };
        delete newState[platformName];
        return newState;
      }
    });
  };

  const handleGenreIdsChange = (event) => {
    if (event.target.checked) {
      setGenreIds([...genreIds, event.target.value]);
    } else {
      setGenreIds(genreIds.filter((value) => value !== event.target.value));
    }
  };

  function handleSubmit(event) {
    event.preventDefault();

    formData.append('name', name);
    formData.append('developerId', developerId);
    formData.append('publisherId', publisherId);
    formData.append('activationId', activationId);
    formData.append('releaseOn', releaseOn);
    formData.append('description', description);
    const formatPrice = price.toString().replace('.', ',');
    formData.append('price', formatPrice);
    formData.append('videoUrl', videoUrl);

    for (var i = 0; i < genreIds.length; i++) {
      formData.append('genreIds[]', genreIds[i]);
    }

    const arrayMinSpecIds = Object.values(minimumSpecificationIds);
    for (var j = 0; j < arrayMinSpecIds.length; j++) {
      formData.append('minimumSpecificationIds[]', arrayMinSpecIds[j]);
    }

    formData.append('avatar', avatar);

    console.log(Object.values(minimumSpecificationIds));
    gameService
      .saveFormGame(0, formData)
      .then((response) => {
        navigate('..');
      })
      .catch((error) => setErrors(error.response.data.errors));
  }

  return (
    <div className='container-fluid'>
      <form
        onSubmit={handleSubmit}
        className='row g-3 mx-auto'
        style={{ maxWidth: '1280px' }}
      >
        <h1>Добавить новую игру</h1>
        <InlineError field='Game' errors={errors} />

        <label htmlFor='name' className='form-label col-md-4'>
          <InlineError field='name' errors={errors} />
          Название
          <input
            className='form-control'
            type='text'
            name='name'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label htmlFor='developerId' className='form-label col-md-4'>
          <InlineError field='developerId' errors={errors} />
          Разработчик
          <select
            className='form-select'
            size='1'
            name='developerId'
            onChange={(event) => setDeveloperId(Number(event.target.value))}
          >
            {!developerId && (
              <option key={0} value=''>
                Выберите разработчика
              </option>
            )}

            {developers.length > 0 &&
              developers.map((developer) => (
                <option
                  key={developer.id}
                  value={developer.id}
                  datatype='number'
                >
                  {developer.name}
                </option>
              ))}
          </select>
        </label>

        <label htmlFor='publisherId' className='form-label col-md-4'>
          <InlineError field='publisherId' errors={errors} />
          Издатель
          <select
            className='form-select'
            size='1'
            name='publisherId'
            onChange={(event) => setPublisherId(Number(event.target.value))}
          >
            {!publisherId && (
              <option key={0} value=''>
                Выберите издателя
              </option>
            )}
            {publishers.length > 0 &&
              publishers.map((publisher) => (
                <option key={publisher.id} value={publisher.id}>
                  {publisher.name}
                </option>
              ))}
          </select>
        </label>

        <label htmlFor='description ' className='form-label col-md-6'>
          <InlineError field='description' errors={errors} />
          Описание
          <textarea
            className='form-control'
            name='description'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>

        <label className='form-label col-md-6'>
          <InlineError field='activationId' errors={errors} />
          Активация:
          <select
            className='form-select'
            size='1'
            onChange={(event) => setActivationId(Number(event.target.value))}
          >
            {!activationId && (
              <option key={0} value=''>
                Выберите площадку для активации
              </option>
            )}
            {activations.length > 0 &&
              activations.map((activation) => (
                <option
                  key={activation.id}
                  value={activation.id}
                  datatype='number'
                >
                  {activation.name}
                </option>
              ))}
          </select>
        </label>

        <label htmlFor='releaseOn ' className='form-label col-md-4'>
          <InlineError field='releaseOn' errors={errors} />
          Дата выпуска
          <input
            className='form-control'
            type='date'
            name='releaseOn'
            onChange={(event) => setReleaseOn(event.target.value)}
            required
          />
        </label>

        <label htmlFor='price' className='form-label col-md-4'>
          <InlineError field='price' errors={errors} />
          Цена
          <input
            className='form-control'
            type='number'
            step='0.01'
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            name='price'
          />
        </label>

        <label htmlFor='videoUrl ' className='form-label col-md-4'>
          <InlineError field='videoUrl' errors={errors} />
          Видео
          <input
            className='form-control'
            type='url'
            name='videoUrl'
            value={videoUrl}
            onChange={(event) => setVideoUrl(event.target.value)}
          />
        </label>

        <label htmlFor='avatar' className='form-label'>
          <InlineError field='avatar' errors={errors} />
          Изображение аватара
          <input
            className='form-control'
            type='file'
            onChange={handleImageChange}
          />
        </label>
        <InlineError field='genreIds' errors={errors} />
        <fieldset className='border rounded mb-2 p-2'>
          <legend className='fw-bold'>Жанры</legend>
          <div className='d-flex'>
            {genres.length > 0 &&
              genres.map((genre) => (
                <div class='form-check me-4' key={genre.id}>
                  <label htmlFor='genreIds' className='form-check-label' />
                  {genre.name}
                  <input
                    className='form-check-input'
                    type='checkbox'
                    name='genreIds'
                    value={genre.id}
                    onChange={handleGenreIdsChange}
                  />
                </div>
              ))}
          </div>
        </fieldset>
        <InlineError field='minimumSpecificationIds' errors={errors} />
        <div className='border mb-2 rounded'>
          <fieldset>
            <legend className='fw-bold p-2 border-bottom '>
              Мин спецификация
            </legend>

            {platforms.length > 0 &&
              platforms.map((platform) => {
                const minSpecsFiltred = minSpecs.filter(
                  (minSpec) => minSpec.platform.name === platform.name
                );
                return (
                  <fieldset key={platform.id} className='p-2 mb-1'>
                    <legend className=' fw-bold'>{platform.name}</legend>
                    <div className='minSpecs shadow-sm border-bottom '>
                      <div className='p-2'>
                        <div className='minSpec form-check ' key={0}>
                          <input
                            className='form-check-input'
                            type='radio'
                            value={0}
                            name={platform.name}
                            onChange={() => handleMinSpecIds(platform.name)}
                            defaultChecked
                          />
                          <p className='fw-bold'>Нет</p>
                        </div>
                      </div>

                      <div className='d-flex p-2'>
                        {minSpecsFiltred.length > 0 &&
                          minSpecsFiltred.map((minSpecFiltred) => (
                            <div
                              className='d-flex pe-3 minSpec form-check border shadow-sm rounded me-2 bg-min-spec border-min-spec'
                              key={minSpecFiltred.id}
                            >
                              <input
                                className='form-check-input'
                                type='radio'
                                value={minSpecFiltred.id}
                                name={platform.name}
                                onChange={() =>
                                  handleMinSpecIds(
                                    platform.name,
                                    minSpecFiltred.id
                                  )
                                }
                              />

                              <div className='ms-1'>
                                <p>
                                  <b>ОС:</b> {minSpecFiltred.operatingSystem}
                                </p>
                                <p>
                                  <b>Процессор:</b> {minSpecFiltred.processor}
                                </p>
                                <p>
                                  <b>Память:</b> {minSpecFiltred.memory}
                                </p>
                                <p>
                                  <b>Свободное место:</b>{' '}
                                  {minSpecFiltred.storage}
                                </p>
                                <p>
                                  <b>Видеокарта:</b> {minSpecFiltred.graphics}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </fieldset>
                );
              })}
          </fieldset>
        </div>

        <button type='submit' className='btn btn-primary'>
          Отправить
        </button>
      </form>
      <Link to='..'>Назад</Link>
    </div>
  );
}
