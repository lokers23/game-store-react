import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { keyService } from '../../../services/KeyService';
import { Link } from 'react-router-dom';
import '../../../styles/Crud.css';

export default function TableKey() {
  const navigate = useNavigate();
  const [keys, setKeys] = useState([]);

  const fetchData = () => {
    keyService
      .getKeys()
      .then((response) => setKeys(response.data.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  function deleteKey(id) {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      keyService
        .deleteKey(id)
        .then((response) => setKeys(keys.filter((key) => key.id !== id)))
        .catch((error) => console.log(error.data.message));
    }
  }

  return (
    <div>
      <h1>Ключи</h1>
      <Link to='create'>Добавить новую запись</Link>
      <table>
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Игра</th>
            <th scope='col'>Значение</th>
            <th scope='col'>Площадка для активации</th>
            <th scope='col'>Использованный</th>
            <th scope='col'></th>
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
                <td>{key.activation.name}</td>
                <td>{key.isUsed ? 'Использован' : 'Не использован'}</td>

                <td>
                  <button onClick={() => deleteKey(key.id)}>Удалить</button>
                </td>
                <td>
                  <Link to={`edit/${key.id}`}> Редактировать</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
