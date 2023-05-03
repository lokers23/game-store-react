import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { minSpecificationService } from '../../../services/MinSpecificationService';
import { Link } from 'react-router-dom';
import '../../../styles/Crud.css';

export default function TableMinSpecification() {
  const navigate = useNavigate();
  const [minSpecs, setMinSpecs] = useState([]);

  const fetchData = () => {
    minSpecificationService
      .getMinSpecs()
      .then((response) => setMinSpecs(response.data.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  function deleteMinSpecification(id) {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      minSpecificationService
        .deleteMinSpec(id)
        .then((response) =>
          setMinSpecs(minSpecs.filter((minSpec) => minSpec.id !== id))
        )
        .catch((error) => console.log(error.data.message));
    }
  }

  return (
    <div>
      <h1>Минимальная спецификация</h1>
      <Link to='create'>Добавить новую запись</Link>
      <table>
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Операционная система</th>
            <th scope='col'>Процессор</th>
            <th scope='col'>Оперативная память</th>
            <th scope='col'>Видеокарта</th>
            <th scope='col'>Свободное место</th>
            <th scope='col'>Платформа</th>
            <th scope='col'></th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {minSpecs.length > 0 &&
            minSpecs.map((minSpec) => (
              <tr key={minSpec.id}>
                <td>{minSpec.id}</td>
                <td>{minSpec.operatingSystem}</td>
                <td>{minSpec.processor}</td>
                <td>{minSpec.memory}</td>
                <td>{minSpec.graphics}</td>
                <td>{minSpec.storage}</td>
                <td>{minSpec.platform.name}</td>
                <td>
                  <button onClick={() => deleteMinSpecification(minSpec.id)}>
                    Удалить
                  </button>
                </td>
                <td>
                  <Link to={`edit/${minSpec.id}`}> Редактировать</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
