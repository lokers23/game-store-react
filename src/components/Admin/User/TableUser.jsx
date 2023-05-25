import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userService } from '../../../services/UserService';
import Pagination from '../../Pagination/Pagination';
import { ROLES } from '../../../Constants';

function TableUser() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const roles = ROLES;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const deleteUser = (id) => {};

  const handlePageChange = (value) => {
    setPage(value);
  };

  const fetchData = () => {
    userService
      .getUsers()
      .then((response) => setUsers(response.data.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div className='container-fluid'>
      <h2 className='mb-2'>Пользователи</h2>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Логин</th>
            <th scope='col'>Почта</th>
            <th scope='col'>Роль</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.login}</td>
                <td>{user.mail}</td>
                <td>{ROLES[user.role]}</td>
                <td>
                  <button
                    className='btn btn-danger btn-sm me-1'
                    onClick={() => deleteUser(user.id)}
                  >
                    <i class='bi-trash-fill' />
                  </button>
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

export default TableUser;
