import React from 'react';
import { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { platformService } from '../../../services/PlatformService';
import { Link } from 'react-router-dom';
import '../../../styles/Crud.css';
import Pagination from '../../Pagination/Pagination';

export default function TablePlatform() {
  //const navigate = useNavigate();
  const [platforms, setPlatforms] = useState([]);

  const [filters, setFilters] = useState(null);
  const [name, setName] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  // const fetchData = () => {
  //   platformService
  //     .getPlatforms(page, pageSize, null, filters)
  //     .then((response) => {
  //       setPlatforms(response.data.data);
  //       setHasNextPage(response.data.hasNextPage);
  //       setHasPreviousPage(response.data.hasPreviousPage);
  //     })
  //     .catch((error) => console.log(error));
  // };

  useEffect(() => {
    platformService
      .getPlatforms(page, pageSize, null, filters)
      .then((response) => {
        setPlatforms(response.data.data);
        setHasNextPage(response.data.hasNextPage);
        setHasPreviousPage(response.data.hasPreviousPage);
      })
      .catch((error) => console.log(error));
  }, [page, filters, pageSize]);

  function deletePlatform(id) {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      platformService
        .deletePlatform(id)
        .then((response) =>
          setPlatforms(platforms.filter((platform) => platform.id !== id))
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
    <div className='container-fluid'>
      <h2 className='mb-2'>Платформа ОС</h2>
      <Link className='btn btn-primary btn-sm mb-2' to='create'>
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
        <button type='submit' className='btn btn-primary align-self-end ms-2'>
          Отфильтровать
        </button>
      </form>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Название</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {platforms.length > 0 &&
            platforms.map((platform) => (
              <tr key={platform.id}>
                <td>{platform.id}</td>
                <td>{platform.name}</td>
                <td>
                  <button
                    className='btn btn-danger btn-sm me-1'
                    onClick={() => deletePlatform(platform.id)}
                  >
                    <i class='bi-trash-fill' />
                  </button>
                  <Link
                    className='btn btn-warning btn-sm'
                    to={`edit/${platform.id}`}
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
