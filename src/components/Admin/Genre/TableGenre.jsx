import React from 'react';
import { useEffect, useState } from 'react';
import { genreService } from '../../../services/GenreService';
import { Link } from 'react-router-dom';
import '../../../styles/admin-table.css';
import Pagination from '../../Pagination/Pagination';

export default function TableGenre() {
  const [genres, setGenres] = useState([]);

  const [filters, setFilters] = useState(null);
  const [name, setName] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  useEffect(() => {
    genreService
      .getGenres(page, pageSize, null, filters)
      .then((response) => {
        setGenres(response.data.data);
        setHasNextPage(response.data.hasNextPage);
        setHasPreviousPage(response.data.hasPreviousPage);
      })
      .catch((error) => console.log(error));
  }, [page, filters, pageSize]);

  function deleteGenre(id) {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      genreService
        .deleteGenre(id)
        .then((response) =>
          setGenres(genres.filter((genre) => genre.id !== id))
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
    <div className='container-fluid admin-table'>
      <h2 className='mb-2'>Жанры</h2>
      <Link to='create' className='btn admin-create-button btn-sm mb-2'>
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
      <div>
        <table className='table table-striped table-auto'>
          <thead>
            <tr>
              <th scope='col'>Id</th>
              <th scope='col'>Название</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {genres.length > 0 &&
              genres.map((genre) => (
                <tr key={genre.id}>
                  <td>{genre.id}</td>
                  <td>{genre.name}</td>
                  <td>
                    <button
                      className='btn btn-danger btn-sm me-2'
                      onClick={() => deleteGenre(genre.id)}
                    >
                      <i className='bi-trash-fill' />
                    </button>
                    <Link
                      className='btn btn-warning btn-sm'
                      to={`edit/${genre.id}`}
                    >
                      <i className='bi-pencil-square' />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination
        page={page}
        onChange={handlePageChange}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
      />
    </div>
  );
}
