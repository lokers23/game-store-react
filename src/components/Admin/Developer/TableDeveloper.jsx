import React from 'react';
import { useEffect, useState } from 'react';
import { developerService } from '../../../services/DeveloperService';
import { Link } from 'react-router-dom';
import Pagination from '../../Pagination/Pagination';
import '../../../styles/admin-table.css';

export default function TableDeveloper() {
  const [developers, setDevelopers] = useState([]);

  const [filters, setFilters] = useState(null);
  const [name, setName] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  useEffect(() => {
    developerService
      .getDevelopers(page, pageSize, null, filters)
      .then((response) => {
        setDevelopers(response.data.data);
        setHasNextPage(response.data.hasNextPage);
        setHasPreviousPage(response.data.hasPreviousPage);
      })
      .catch((error) => console.log(error));
  }, [page, filters, pageSize]);

  function deleteDeveloper(id) {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      developerService
        .deleteDeveloper(id)
        .then((response) =>
          setDevelopers(developers.filter((developer) => developer.id !== id))
        )
        .catch((error) => console.log(error.data.message));
    }
  }

  const handlePageChange = (value) => {
    setPage(value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const nameFilter = `&name=${name}`;
    setFilters(nameFilter);
  }

  return (
    <div className='container-fluid  admin-table'>
      <h2 className='mb-2'>Разработчики</h2>
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
          className='btn admin-filter-button align-self-end ms-2'
        >
          Отфильтровать
        </button>
      </form>
      <table className='table table-striped table-auto'>
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Название</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {developers.length > 0 &&
            developers.map((developer) => (
              <tr key={developer.id}>
                <td>{developer.id}</td>
                <td>{developer.name}</td>
                <td>
                  <button
                    className='btn btn-danger btn-sm me-1'
                    onClick={() => deleteDeveloper(developer.id)}
                  >
                    <i className='bi-trash-fill' />
                  </button>
                  <Link
                    className='btn btn-warning btn-sm'
                    to={`edit/${developer.id}`}
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
