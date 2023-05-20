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
    <div className='container-fluid'>
      <h1 className='mb-2'>Издатели</h1>
      <Link className='btn btn-primary btn-sm mb-2' to='create'>
        Добавить новую запись
      </Link>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Название</th>
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
                  <button
                    className='btn btn-danger me-1'
                    onClick={() => deletePublisher(publisher.id)}
                  >
                    <i class='bi-trash-fill' />
                  </button>
                  <Link className='btn btn-warning' to={`edit/${publisher.id}`}>
                    <i class='bi-pencil-square' />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
