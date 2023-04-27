import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { activationService } from '../../../services/ActivationService';
import { Link } from 'react-router-dom';
import '../../../styles/Crud.css';

export default function TableActivation() {
  const navigate = useNavigate();
  const [activations, setActivations] = useState([]);

  const fetchData = () => {
    activationService
      .getActivations()
      .then((response) => setActivations(response.data.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  function deleteActivation(id) {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      activationService
        .deleteActivation(id)
        .then((response) =>
          setActivations(
            activations.filter((activation) => activation.id !== id)
          )
        )
        .catch((error) => console.log(error.data.message));
    }
  }

  return (
    <div>
      <h1>Площадки для активации</h1>
      <Link to='create'>Добавить новую запись</Link>
      <table>
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Название</th>
            <th scope='col'></th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {activations.length > 0 &&
            activations.map((activation) => (
              <tr key={activation.id}>
                <td>{activation.id}</td>
                <td>{activation.name}</td>
                <td>
                  <button onClick={() => deleteActivation(activation.id)}>
                    Удалить
                  </button>
                </td>
                <td>
                  <Link to={`edit/${activation.id}`}> Редактировать</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
