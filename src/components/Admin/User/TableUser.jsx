import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userService } from '../../../services/UserService';
import Pagination from '../../Pagination/Pagination';
import { ROLES } from '../../../Constants';

function TableUser() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const roles = ROLES;

  const [login, setLogin] = useState(null);
  const [filters, setFilters] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const deleteUser = (id) => {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      userService
        .deleteUser(id)
        .then((response) => setUsers(users.filter((user) => user.id !== id)))
        .catch((error) => console.log(error));
    }
  };

  const handlePageChange = (value) => {
    setPage(value);
  };

  const fetchData = () => {
    userService
      .getUsers(page, pageSize, null, filters)
      .then((response) => {
        setUsers(response.data.data);
        setHasNextPage(response.data.hasNextPage);
        setHasPreviousPage(response.data.hasPreviousPage);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [page, filters]);

  function handleSubmit(event) {
    console.log('filt');
    event.preventDefault();
    const nameFilter = `&login=${login}`;
    setFilters(nameFilter);
  }

  return (
    <div className='container-fluid'>
      <h2 className='mb-2'>Пользователи</h2>
      <form className='d-flex flex-row mb-2' onSubmit={handleSubmit}>
        <div>
          <label className='form-label '>Название</label>
          <input
            className='form-control'
            value={login}
            onChange={(event) => setLogin(event.target.value)}
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
                <td>
                  {ROLES[user.role]}
                  <Link className='btn  btn-sm' to={`${user.id}/role`}>
                    <i class='bi-pencil-square' />
                  </Link>
                </td>
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
