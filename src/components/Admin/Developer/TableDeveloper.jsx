import React from 'react';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { developerService } from '../../../services/DeveloperService';
import { Link } from 'react-router-dom';
import '../../../styles/Crud.css';

export default function TableDeveloper() {
  const navigate = useNavigate();
  const [developers, setDevelopers] = useState([]);

  const fetchData = () => {
    developerService
      .getDevelopers()
      .then((response) => setDevelopers(response.data.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

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

  return (
    <div className='container-fluid'>
      <h2 className='mb-2'>Разработчики</h2>
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
                    <i class='bi-trash-fill' />
                  </button>
                  <Link
                    className='btn btn-warning btn-sm'
                    to={`edit/${developer.id}`}
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
