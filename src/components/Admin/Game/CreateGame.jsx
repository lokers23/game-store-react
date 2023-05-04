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

export default function CreateGame() {
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
    // if (event.target.files && event.target.files[0]) {
    //   setAvatar(URL.createObjectURL(event.target.files[0]));
    // }
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
    formData.append('releaseOn', releaseOn);
    formData.append('description', description);
    formData.append('price', price);
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
      .catch((error) => console.log(error.response.data.errors));
    // gameService
    //   .saveFormGame(0, formData)
    //   // .saveGame(0, {
    //   //   id: 0,
    //   //   name: '',
    //   //   developerId: 0,
    //   //   publisherId: 0,
    //   //   releaseOn: Date,
    //   //   description: '',
    //   //   price: 1,
    //   //   videoUrl: '',
    //   //   genreIds: [],
    //   //   MinimumSpecificationIds: []
    //   // })

    //   .then((response) => {
    //     navigate('..');
    //   })

    //   .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>Добавить новую игру</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>
          Название
          <input
            type='text'
            name='name'
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>

        <label htmlFor='developerId'>
          Разработчик
          <select
            size='1'
            name='developerId'
            onChange={(event) => setDeveloperId(Number(event.target.value))}
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

        <label htmlFor='publisherId'>
          Издатель
          <select
            size='1'
            name='publisherId'
            onChange={(event) => setPublisherId(Number(event.target.value))}
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

        <label htmlFor='description '>
          Описание
          <textarea
            name='description'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </label>

        <label htmlFor='releaseOn '>
          Дата выпуска
          <input
            type='date'
            name='releaseOn'
            onChange={(event) => setReleaseOn(event.target.value)}
            required
          />
        </label>

        <label htmlFor='price'>
          Цена
          <input
            type='number'
            step='0.01'
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            name='price'
            required
          />
        </label>

        <label htmlFor='videoUrl '>
          Видео
          <input
            type='url'
            name='videoUrl'
            value={videoUrl}
            onChange={(event) => setVideoUrl(event.target.value)}
            required
          />
        </label>

        <label htmlFor='avatar'>
          Изображение аватара
          <input
            type='file'
            //name='avatar'
            onChange={handleImageChange}
            //accept='image/jpeg'
            required
          />
        </label>

        <fieldset>
          <legend>Жанры</legend>
          {genres.length > 0 &&
            genres.map((genre) => (
              <label htmlFor='genreIds' key={genre.id}>
                {genre.name}
                <input
                  type='checkbox'
                  name='genreIds'
                  value={genre.id}
                  onChange={handleGenreIdsChange}
                />
              </label>
            ))}
        </fieldset>

        <div>
          <fieldset>
            <legend> Мин спецификация</legend>

            {platforms.length > 0 &&
              platforms.map((platform) => {
                const minSpecsFiltred = minSpecs.filter(
                  (minSpec) => minSpec.platform.name === platform.name
                );
                return (
                  <fieldset key={platform.id}>
                    <legend>{platform.name}</legend>
                    <div className='minSpecs'>
                      <div className='minSpec' key={0}>
                        <input
                          type='radio'
                          value={0}
                          name={platform.name}
                          onChange={() => handleMinSpecIds(platform.name)}
                          defaultChecked
                        />
                        <p>Нет</p>
                      </div>
                      {minSpecsFiltred.length > 0 &&
                        minSpecsFiltred.map((minSpecFiltred) => (
                          <div className='minSpec' key={minSpecFiltred.id}>
                            <input
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
                            <p>ОС: {minSpecFiltred.operatingSystem}</p>
                            <p>Процессор:{minSpecFiltred.processor}</p>
                            <p>Память: {minSpecFiltred.memory}</p>
                            <p>Свободное место: {minSpecFiltred.storage}</p>
                            <p>Видеокарта: {minSpecFiltred.graphics}</p>
                          </div>
                        ))}
                    </div>
                  </fieldset>
                );
              })}
          </fieldset>
        </div>

        <button type='submit'>Отправить</button>
      </form>
      <Link to='..'>Назад</Link>
    </div>
  );
}
