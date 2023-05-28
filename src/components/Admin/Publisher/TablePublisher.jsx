import React from 'react';
import { useEffect, useState } from 'react';
import { publisherService } from '../../../services/PublisherService';
import { Link } from 'react-router-dom';
import Pagination from '../../Pagination/Pagination';
import '../../../styles/admin-table.css';

export default function TablePublisher() {
  const [publishers, setPublishers] = useState([]);

  const [filters, setFilters] = useState(null);
  const [name, setName] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

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
    publisherService
      .getPublishers(page, pageSize, null, filters)
      .then((response) => {
        setPublishers(response.data.data);
        setHasNextPage(response.data.hasNextPage);
        setHasPreviousPage(response.data.hasPreviousPage);
      })
      .catch((error) => console.log(error));
  }, [page, filters, pageSize]);

  function handleSubmit(event) {
    event.preventDefault();
    const nameFilter = `&name=${name}`;
    setFilters(nameFilter);
  }

  return (
    <div className='container-fluid admin-table'>
      <h2 className='mb-2'>Издатели</h2>
      <Link className='btn admin-create-button btn-sm mb-2' to='create'>
        Добавить новую запись
      </Link>
      <form className='d-flex flex-row mb-2' onSubmit={handleSubmit}>
        <div>
          <label className='form-label '>Название</label>
          <input
            className='form-control'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <button
          type='submit'
          className='btn align-self-end ms-2 admin-filter-button'
        >
          Отфильтровать
        </button>
      </form>
      <table className='table table-striped table-auto'>
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
                    <i className='bi-trash-fill' />
                  </button>
                  <Link
                    className='btn btn-warning btn-sm'
                    to={`edit/${publisher.id}`}
                  >
                    <i className='bi-pencil-square' />
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
