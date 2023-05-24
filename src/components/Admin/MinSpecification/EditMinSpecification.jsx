import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { platformService } from '../../../services/PlatformService';
import { minSpecificationService } from '../../../services/MinSpecificationService';
import { InlineError } from '../../InlineError';

export default function EditMinSpecification() {
  const { id } = useParams();
  const [errors, setErrors] = useState([]);

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

    minSpecificationService
      .getMinSpecById(id)
      .then((response) => {
        setOperatingSystem(response.data.data.operatingSystem);
        setProcessor(response.data.data.processor);
        setMemory(response.data.data.memory);
        setGraphics(response.data.data.graphics);
        setStorage(response.data.data.storage);
        setPlatformId(response.data.data.platform.id);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(platformId);
    minSpecificationService
      .saveMinSpec(id, {
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
      .catch((error) => setErrors(error.response.data.errors));
  }

  return (
    <div className='container-fluid'>
      <h2 className='mb-2'>Редактировать минимальную спецификацию</h2>
      <form
        className='d-flex flex-column'
        onSubmit={handleSubmit}
        style={{ maxWidth: '500px' }}
      >
        <InlineError field='MinimumSpecification' errors={errors} />
        <InlineError field='operatingSystem' errors={errors} />
        <label className='form-label'>
          Операционная система:
          <input
            className='form-control'
            type='text'
            value={operatingSystem}
            onChange={(event) => setOperatingSystem(event.target.value)}
          />
        </label>
        <InlineError field='processor' errors={errors} />

        <label className='form-label'>
          Процессор:
          <input
            className='form-control'
            type='text'
            value={processor}
            onChange={(event) => setProcessor(event.target.value)}
          />
        </label>
        <InlineError field='memory' errors={errors} />

        <label className='form-label'>
          Оперативная память:
          <input
            className='form-control'
            type='text'
            value={memory}
            onChange={(event) => setMemory(event.target.value)}
          />
        </label>
        <InlineError field='graphics' errors={errors} />

        <label className='form-label'>
          Видеокарта:
          <input
            className='form-control'
            type='text'
            value={graphics}
            onChange={(event) => setGraphics(event.target.value)}
          />
        </label>
        <InlineError field='storage' errors={errors} />

        <label className='form-label'>
          Свободное место:
          <input
            className='form-control'
            type='text'
            value={storage}
            onChange={(event) => setStorage(event.target.value)}
          />
        </label>
        <InlineError field='platformId' errors={errors} />

        <label className='form-label'>
          Платформа
          <select
            className='form-select mb-2'
            size='1'
            onChange={(event) => setPlatformId(Number(event.target.value))}
            value={platformId}
          >
            {!platformId && <option value=''>Выберите платформу</option>}

            {platforms.length > 0 &&
              platforms.map((platform) => (
                <option key={platform.id} value={platform.id} datatype='number'>
                  {platform.name}
                </option>
              ))}
          </select>
        </label>
        <button className='btn btn-primary btn-sm mb-2' type='submit'>
          Отправить
        </button>
        <Link className='btn btn-warning btn-sm' to='..'>
          Назад
        </Link>
      </form>
    </div>
  );
}
