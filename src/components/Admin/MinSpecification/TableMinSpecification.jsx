import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { minSpecificationService } from '../../../services/MinSpecificationService';
import { Link } from 'react-router-dom';
import '../../../styles/Crud.css';
import Pagination from '../../Pagination/Pagination';

export default function TableMinSpecification() {
  const navigate = useNavigate();
  const [minSpecs, setMinSpecs] = useState([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const fetchData = () => {
    minSpecificationService
      .getMinSpecs(page, pageSize)
      .then((response) => {
        setMinSpecs(response.data.data);
        setHasNextPage(response.data.hasNextPage);
        setHasPreviousPage(response.data.hasPreviousPage);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [page]);

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

  const handlePageChange = (value) => {
    setPage(value);
  };

  return (
    <div className='container-fluid'>
      <h2 className='mb-2'>Минимальная спецификация</h2>
      <Link className='btn btn-primary btn-sm mb-2' to='create'>
        Добавить новую запись
      </Link>
      <table className='table table-bordered'>
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
                <td className='d-flex justify-content-center'>
                  <button
                    className='btn btn-danger btn-sm me-1'
                    onClick={() => deleteMinSpecification(minSpec.id)}
                  >
                    <i class='bi-trash-fill' />
                  </button>
                  <Link
                    className='btn btn-warning btn-sm'
                    to={`edit/${minSpec.id}`}
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
