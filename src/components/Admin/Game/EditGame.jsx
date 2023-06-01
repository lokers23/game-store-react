import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { gameService } from '../../../services/GameService';
import { genreService } from '../../../services/GenreService';
import { developerService } from '../../../services/DeveloperService';
import { publisherService } from '../../../services/PublisherService';
import { minSpecificationService } from '../../../services/MinSpecificationService';
import { platformService } from '../../../services/PlatformService';
import { activationService } from '../../../services/ActivationService';
import '../../../styles/admin-form.css';
import { InlineError } from '../../InlineError';

export default function EditGame() {
  const { id } = useParams();
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
  const [releaseOn, setReleaseOn] = useState(new Date());
  const [price, setPrice] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [genreIds, setGenreIds] = useState([]);
  const [minimumSpecificationIds, setMinimumSpecificationIds] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [isChangedAvatar, setIsChangedAvatar] = useState(false);
  const [avatarName, setAvatarName] = useState(null);

  // const fetchData = () => {
  //   gameService
  //     .getGameById(id)
  //     .then((response) => {
  //       setName(response.data.data.name);
  //       setDeveloperId(response.data.data.developer.id);
  //       setPublisherId(response.data.data.publisher.id);
  //       setDescription(response.data.data.description);
  //       setReleaseOn(response.data.data.releaseOn);
  //       setPrice(response.data.data.price);
  //       setVideoUrl(response.data.data.videoUrl);
  //       setGenreIds(response.data.data.genres.map((genre) => genre.id));
  //       setActivationId(response.data.data.activation.id);
  //       const minSpecifications = response.data.data.minimumSpecifications;
  //       const minSpecIds = minSpecifications.reduce((acc, spec) => {
  //         acc[spec.platform.name] = spec.id;
  //         return acc;
  //       }, {});

  //       setMinimumSpecificationIds(minSpecIds);
  //       setAvatarName(gameService.getAvatarUrl(response.data.data.avatarName));
  //     })
  //     .catch((error) => error.message);

  //   genreService
  //     .getGenres()
  //     .then((response) => setGenres(response.data.data))
  //     .catch((error) => error.message);

  //   developerService
  //     .getDevelopers()
  //     .then((response) => setDevelopers(response.data.data))
  //     .catch((error) => error.message);

  //   publisherService
  //     .getPublishers()
  //     .then((response) => setPublishers(response.data.data))
  //     .catch((error) => error.message);

  //   minSpecificationService
  //     .getMinSpecs()
  //     .then((response) => setMinSpecs(response.data.data))
  //     .catch((error) => error.message);

  //   platformService
  //     .getPlatforms()
  //     .then((response) => setPlatforms(response.data.data))
  //     .catch((error) => error.message);

  //   activationService
  //     .getActivations()
  //     .then((response) => setActivations(response.data.data))
  //     .catch((error) => error.message);
  // };

  useEffect(() => {
    gameService
      .getGameById(id)
      .then((response) => {
        setName(response.data.data.name);
        setDeveloperId(response.data.data.developer.id);
        setPublisherId(response.data.data.publisher.id);
        setDescription(response.data.data.description);
        setReleaseOn(response.data.data.releaseOn);
        setPrice(response.data.data.price);
        setVideoUrl(response.data.data.videoUrl);
        setGenreIds(response.data.data.genres.map((genre) => genre.id));
        setActivationId(response.data.data.activation.id);
        const minSpecifications = response.data.data.minimumSpecifications;
        const minSpecIds = minSpecifications.reduce((acc, spec) => {
          acc[spec.platform.name] = spec.id;
          return acc;
        }, {});

        setMinimumSpecificationIds(minSpecIds);
        setAvatarName(gameService.getAvatarUrl(response.data.data.avatarName));
      })
      .catch((error) => error.message);

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
  }, [navigate, id]);

  const handleImageChange = (event) => {
    setAvatar(event.target.files[0]);
    setIsChangedAvatar(true);
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
    const genreId = Number(event.target.value);
    if (event.target.checked) {
      setGenreIds([...genreIds, genreId]);
    } else {
      setGenreIds(genreIds.filter((value) => value !== genreId));
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

    const formatPrice = price.toString().replace(',', '.');
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
    formData.append('isChangedAvatar', isChangedAvatar);

    gameService
      .saveFormGame(id, formData)
      .then((response) => {
        navigate('..');
      })
      .catch((error) => setErrors(error.response.data.errors));
  }

  return (
    <div className='container-fluid mb-5'>
      <form
        onSubmit={handleSubmit}
        className='row g-3 mx-auto'
        style={{ maxWidth: '1280px' }}
      >
        <h1>Редактировать игру</h1>
        <InlineError field='Game' errors={errors} />
        <label className='form-label col-md-4' htmlFor='name'>
          <InlineError field='name' errors={errors} />
          Название
          <input
            className='form-control'
            type='text'
            name='name'
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>

        <label htmlFor='developerId' className='form-label col-md-4'>
          <InlineError field='developerId' errors={errors} />
          Разработчик
          <select
            size='1'
            className='form-select'
            //name='developerId'
            onChange={(event) => setDeveloperId(Number(event.target.value))}
            value={developerId}
            required
          >
            {!developerId && <option value=''>Выберите разработчика</option>}

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
            value={publisherId}
            required
          >
            {!publisherId && <option value=''>Выберите издателя</option>}
            {publishers.length > 0 &&
              publishers.map((publisher) => (
                <option key={publisher.id} value={publisher.id}>
                  {publisher.name}
                </option>
              ))}
          </select>
        </label>

        <label className='form-label col-md-6' htmlFor='description'>
          <InlineError field='description' errors={errors} />
          Описание
          <textarea
            className='form-control'
            name='description'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </label>

        <label className='form-label col-md-6'>
          <InlineError field='activationId' errors={errors} />
          Активация:
          <select
            className='form-select'
            size='1'
            name='activationId'
            onChange={(event) => setActivationId(Number(event.target.value))}
            value={activationId}
          >
            {!activationId && (
              <option value=''>Выберите площадку для активации</option>
            )}

            {activations.length > 0 &&
              activations.map((activation) => (
                <option key={activation.id} value={activation.id}>
                  {activation.name}
                </option>
              ))}
          </select>
        </label>

        <label className='form-label col-md-4' htmlFor='releaseOn'>
          <InlineError field='releaseOn' errors={errors} />
          Дата выпуска
          <input
            className='form-control'
            type='date'
            name='releaseOn'
            value={releaseOn}
            onChange={(event) => setReleaseOn(event.target.value)}
            required
          />
        </label>

        <label className='form-label col-md-4' htmlFor='price'>
          <InlineError field='price' errors={errors} />
          Цена
          <input
            className='form-control'
            type='number'
            step='0.01'
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            name='price'
            required
          />
        </label>

        <label className='form-label col-md-4' htmlFor='videoUrl'>
          <InlineError field='videoUrl' errors={errors} />
          Видео
          <input
            className='form-control'
            type='url'
            name='videoUrl'
            value={videoUrl}
            onChange={(event) => setVideoUrl(event.target.value)}
            required
          />
        </label>

        <label className='form-label d-flex flex-column' htmlFor='avatar'>
          <InlineError field='avatar' errors={errors} />
          Изображение аватара
          {!isChangedAvatar && (
            <img
              className='avatar img-thumbnail mb-2'
              style={{ maxWidth: '200px' }}
              src={avatarName}
              alt={avatarName}
            ></img>
          )}
          <input
            className='form-control'
            type='file'
            //value={avatar}
            //name='avatar'
            onChange={handleImageChange}
            //accept='image/jpeg'
            //required
          />
        </label>

        <InlineError field='genreIds' errors={errors} />

        <fieldset className='border rounded mb-2 p-2'>
          <legend className='fw-bold'>Жанры</legend>
          <div className='d-flex'>
            {genres.length > 0 &&
              genres.map((genre) => (
                <div key={genre.id} className='form-check me-4'>
                  <label htmlFor='genreIds' className='form-check-label'>
                    {genre.name}
                    <input
                      className='form-check-input'
                      type='checkbox'
                      name='genreIds'
                      value={genre.id}
                      checked={genreIds.includes(genre.id)}
                      onChange={handleGenreIdsChange}
                    />
                  </label>
                </div>
              ))}
          </div>
        </fieldset>
        <InlineError field='minimumSpecificationIds' errors={errors} />

        <div className='border mb-2 rounded'>
          <fieldset>
            <legend className='fw-bold p-2 border-bottom '>
              {' '}
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
                    <div className='minSpecs shadow-sm border-bottom'>
                      <div className='p-2'>
                        <div className='minSpec form-check' key={0}>
                          <input
                            className='form-check-input'
                            type='radio'
                            value={0}
                            name={platform.name}
                            onClick={() => {
                              handleMinSpecIds(platform.name, 0);
                            }}
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
                                checked={Object.values(
                                  minimumSpecificationIds
                                ).includes(minSpecFiltred.id)}
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

        <button className='btn btn-sm submit-button mb-2' type='submit'>
          Отправить
        </button>
        <Link className='btn btn-sm back-button m-0' to='..'>
          Назад
        </Link>
      </form>
    </div>
  );
}
