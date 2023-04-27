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
      .getPublishers()
      .then((response) => setPublishers(response.data.data))
      .catch((error) => console.log(error));
  };

  function deletePublisher(id) {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      publisherService
        .deletePublisher(id)
        .then((response) =>
          setPublishers(publishers.filter((publisher) => publisher.id !== id))
        )
        .catch((error) => console.log(error.data.message));
    }
  }

  useEffect(() => {
    fetchData();
  }, [navigate]);

  return (
    <div>
      <h1>Издатели</h1>
      <Link to='create'>Добавить новую запись</Link>
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
            publishers.map((publisher) => (
              <tr key={publisher.id}>
                <td>{publisher.id}</td>
                <td>{publisher.name}</td>
                <td>
                  <button onClick={() => deletePublisher(publisher.id)}>
                    Удалить
                  </button>
                </td>
                <td>
                  <Link to={`edit/${publisher.id}`}> Редактировать</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
