import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { publisherService } from '../../../services/PublisherService';
import { Link } from 'react-router-dom';

export default function TablePublisher() {
  const navigate = useNavigate();
  const [publishers, setPublishers] = useState([]);

  const fetchData = () => {
    publisherService
      .setPublishers()
      .then((response) => setPublishers(response.data.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  return (
    <div>
      <h1>Издатели</h1>
      <Link to='/'>Добавить новую запись</Link>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Название</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {publishers.length > 0 &&
            publishers.map((publishers) => (
              <tr>
                <td>{publishers.id}</td>
                <td>{publishers.name}</td>
                <td>
                  <button>Удалить</button>
                </td>
                <td>
                  <button>Редактировать</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
