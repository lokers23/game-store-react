import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { platformService } from '../../../services/PlatformService';
import { Link } from 'react-router-dom';
import '../../../styles/Crud.css';

export default function TablePlatform() {
  const navigate = useNavigate();
  const [platforms, setPlatforms] = useState([]);

  const fetchData = () => {
    platformService
      .getPlatforms()
      .then((response) => setPlatforms(response.data.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

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

  return (
    <div className='container-fluid'>
      <h2 className='mb-2'>Платформа ОС</h2>
      <Link className='btn btn-primary btn-sm mb-2' to='create'>
        Добавить новую запись
      </Link>
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
    </div>
  );
}
