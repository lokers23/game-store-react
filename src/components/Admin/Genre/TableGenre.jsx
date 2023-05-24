import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { genreService } from '../../../services/GenreService';
import { Link } from 'react-router-dom';
import '../../../styles/Crud.css';
import Pagination from '../../Pagination/Pagination';

export default function TableGenre() {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const fetchData = () => {
    genreService
      .getGenres(page, pageSize)
      .then((response) => {
        setGenres(response.data.data);
        setHasNextPage(response.data.hasNextPage);
        setHasPreviousPage(response.data.hasPreviousPage);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [page]);

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

  return (
    <div
      className='container-fluid '
      //style={{ maxWidth: '1000px' }}
    >
      <h2 className='mb-2'>Жанры</h2>
      <Link to='create' className='btn btn-primary btn-sm mb-2'>
        Добавить новую запись
      </Link>
      <table className='table table-bordered table-responsive'>
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
                    <i class='bi-trash-fill' />
                  </button>
                  <Link
                    className='btn btn-warning btn-sm'
                    to={`edit/${genre.id}`}
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
