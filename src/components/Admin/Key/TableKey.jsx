import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { keyService } from '../../../services/KeyService';
import { Link } from 'react-router-dom';
import '../../../styles/Crud.css';
import Pagination from '../../Pagination/Pagination';

export default function TableKey() {
  const navigate = useNavigate();
  const [keys, setKeys] = useState([]);

  const [filters, setFilters] = useState(null);
  const [gameName, setGameName] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const fetchData = () => {
    keyService
      .getKeys(page, pageSize, null, filters)
      .then((response) => {
        setKeys(response.data.data);
        setHasNextPage(response.data.hasNextPage);
        setHasPreviousPage(response.data.hasPreviousPage);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [page, filters]);

  function deleteKey(id) {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      keyService
        .deleteKey(id)
        .then((response) => setKeys(keys.filter((key) => key.id !== id)))
        .catch((error) => console.log(error.data.message));
    }
  }

  const handlePageChange = (value) => {
    setPage(value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const nameFilter = `&game=${gameName}`;
    setFilters(nameFilter);
  }

  return (
    <div className='container-fluid'>
      <h2 className='mb-2'>Ключи</h2>
      <Link className='btn btn-primary btn-sm mb-2' to='create'>
        Добавить новую запись
      </Link>
      <form className='d-flex flex-row mb-2' onSubmit={handleSubmit}>
        <div>
          <label className='form-label '>Название игры</label>
          <input
            className='form-control'
            value={gameName}
            onChange={(event) => setGameName(event.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-primary align-self-end ms-2'>
          Отфильтровать
        </button>
      </form>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Игра</th>
            <th scope='col'>Значение</th>
            <th scope='col'>Использованный</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {keys.length > 0 &&
            keys.map((key) => (
              <tr key={key.id}>
                <td>{key.id}</td>
                {key.game ? <td>{key.game.name}</td> : <td></td>}
                <td>{key.value}</td>
                <td>{key.isUsed ? 'Использован' : 'Не использован'}</td>
                <td>
                  <button
                    className='btn btn-danger btn-sm me-1'
                    onClick={() => deleteKey(key.id)}
                  >
                    <i class='bi-trash-fill' />
                  </button>
                  <Link
                    className='btn btn-warning btn-sm'
                    to={`edit/${key.id}`}
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
