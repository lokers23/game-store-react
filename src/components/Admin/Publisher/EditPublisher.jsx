import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { publisherService } from '../../../services/PublisherService';

export default function EditPublisher() {
  const { id } = useParams();
  const [publisherName, setPublisherName] = useState('');
  const navigate = useNavigate();

  const fetchData = () => {
    publisherService
      .getPublisherById(id)
      .then((response) => setPublisherName(response.data.data.name))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  function handleSubmit(event) {
    event.preventDefault();
    publisherService
      .savePublisher(id, {
        id: 0,
        name: publisherName
      })
      .then((response) => {
        navigate('..');
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>Редактирование издателя</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Название:
          <input
            type='text'
            value={publisherName}
            onChange={(event) => setPublisherName(event.target.value)}
          />
        </label>
        <button type='submit'>Отправить</button>
      </form>

      <Link to='..'>Назад</Link>
    </div>
  );
}
