import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { publisherService } from '../../../services/PublisherService';
import { Link } from 'react-router-dom';
import Pagination from '../../Pagination/Pagination';

export default function TablePublisher() {
  const navigate = useNavigate();
  const [publishers, setPublishers] = useState([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const fetchData = () => {
    publisherService
      .getPublishers(page, pageSize)
      .then((response) => {
        setPublishers(response.data.data);
        setHasNextPage(response.data.hasNextPage);
        setHasPreviousPage(response.data.hasPreviousPage);
      })
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

  const handlePageChange = (value) => {
    setPage(value);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div className='container-fluid'>
      <h2 className='mb-2'>Издатели</h2>
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
                    className='btn btn-danger btn-sm me-1'
                    onClick={() => deletePublisher(publisher.id)}
                  >
                    <i class='bi-trash-fill' />
                  </button>
                  <Link
                    className='btn btn-warning btn-sm'
                    to={`edit/${publisher.id}`}
                  >
                    <i class='bi-pencil-square' />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination
        page={page}
        onChange={handlePageChange}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
      />
    </div>
  );
}
