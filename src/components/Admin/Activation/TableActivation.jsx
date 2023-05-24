import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { activationService } from '../../../services/ActivationService';
import { Link } from 'react-router-dom';
import '../../../styles/Crud.css';
import Pagination from '../../Pagination/Pagination';

export default function TableActivation() {
  const navigate = useNavigate();
  const [activations, setActivations] = useState([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const fetchData = () => {
    activationService
      .getActivations(page, pageSize)
      .then((response) => {
        setActivations(response.data.data);
        setHasNextPage(response.data.hasNextPage);
        setHasPreviousPage(response.data.hasPreviousPage);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [page]);

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

  const handlePageChange = (value) => {
    setPage(value);
  };

  return (
    <div className='container-fluid'>
      <h2 className='mb-2'>Площадки для активации</h2>
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
          {activations.length > 0 &&
            activations.map((activation) => (
              <tr key={activation.id}>
                <td>{activation.id}</td>
                <td>{activation.name}</td>
                <td>
                  <button
                    className='btn btn-danger btn-sm me-1'
                    onClick={() => deleteActivation(activation.id)}
                  >
                    <i class='bi-trash-fill' />
                  </button>
                  <Link
                    className='btn btn-warning btn-sm'
                    to={`edit/${activation.id}`}
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
