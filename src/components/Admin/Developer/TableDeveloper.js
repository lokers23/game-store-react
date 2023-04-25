import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { developerService } from '../../../services/DeveloperService';
import { Link } from 'react-router-dom';

export default function TableDeveloper() {
  const navigate = useNavigate();
  const [developers, setDevelopers] = useState([]);

  const fetchData = () => {
    developerService
      .setDevelopers()
      .then((response) => setDevelopers(response.data.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  return (
    <div>
      <h1>Разработчики</h1>
      <Link to='/'>Добавить новую запись</Link>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Название</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {developers.length > 0 &&
            developers.map((developer) => (
              <tr>
                <td>{developer.id}</td>
                <td>{developer.name}</td>
                <td>
                  <button>Удалить</button>
                </td>
                <td>
                  <button>Редактировать</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
