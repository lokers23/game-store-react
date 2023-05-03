import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { minSpecificationService } from '../../../services/MinSpecificationService';
import { platformService } from '../../../services/PlatformService';

export default function CreateMinSpecification() {
  const [operatingSystem, setOperatingSystem] = useState('');
  const [processor, setProcessor] = useState('');
  const [memory, setMemory] = useState('');
  const [graphics, setGraphics] = useState('');
  const [storage, setStorage] = useState('');
  const [platformId, setPlatformId] = useState(null);

  const [platforms, setPlatforms] = useState([]);

  const navigate = useNavigate();

  const fetchData = () => {
    platformService
      .getPlatforms()
      .then((response) => setPlatforms(response.data.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(platformId);
    minSpecificationService
      .saveMinSpec(0, {
        id: 0,
        operatingSystem: operatingSystem,
        processor: processor,
        memory: memory,
        storage: storage,
        graphics: graphics,
        platformId: platformId
      })
      .then((response) => {
        navigate('..');
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>Добавить новую минимальную спецификацию</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Операционная система:
          <input
            type='text'
            value={operatingSystem}
            onChange={(event) => setOperatingSystem(event.target.value)}
          />
        </label>
        <label>
          Процессор:
          <input
            type='text'
            value={processor}
            onChange={(event) => setProcessor(event.target.value)}
          />
        </label>
        <label>
          Оперативная память:
          <input
            type='text'
            value={memory}
            onChange={(event) => setMemory(event.target.value)}
          />
        </label>
        <label>
          Видеокарта:
          <input
            type='text'
            value={graphics}
            onChange={(event) => setGraphics(event.target.value)}
          />
        </label>
        <label>
          Свободное место:
          <input
            type='text'
            value={storage}
            onChange={(event) => setStorage(event.target.value)}
          />
        </label>
        <select
          size='1'
          onChange={(event) => setPlatformId(Number(event.target.value))}
        >
          {!platformId && <option value=''>Выберите платформу</option>}

          {platforms.length > 0 &&
            platforms.map((platform) => (
              <option key={platform.id} value={platform.id} datatype='number'>
                {platform.name}
              </option>
            ))}
        </select>
        <button type='submit'>Отправить</button>
      </form>

      <Link to='..'>Назад</Link>
    </div>
  );
}
