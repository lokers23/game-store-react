import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { developerService } from '../../../services/DeveloperService';
import { InlineError } from '../../InlineError';
import { userService } from '../../../services/UserService';
import { ROLES } from '../../../Constants';

export default function ChangeRoleForm() {
  const { id } = useParams();
  const [user, setUser] = useState(0);
  const [role, setRole] = useState(0);

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  // const fetchData = () => {
  //   userService
  //     .getUserById(id)
  //     .then((response) => {
  //       setUser(response.data.data);
  //       setRole(response.data.data.role);
  //     })
  //     .catch();
  // };

  useEffect(() => {
    userService
      .getUserById(id)
      .then((response) => {
        setUser(response.data.data);
        setRole(response.data.data.role);
      })
      .catch();
  }, [navigate, id]);

  function handleSubmit(event) {
    event.preventDefault();
    userService
      .changeRole(user.id, role)
      .then((response) => {
        navigate('..');
      })
      .catch((error) => setErrors(error.response.data.errors));
  }

  return (
    <div className='container-fluid'>
      <h2 className='mb-2'>Смена роли пользователя</h2>
      <form
        className='d-flex flex-column'
        onSubmit={handleSubmit}
        style={{ maxWidth: '500px' }}
      >
        <div className='mb-2'>
          <label className='form-label'>Логин</label>
          <input className='form-control' value={user.login} readOnly />
        </div>
        <div className='mb-2'>
          <label className='form-label'>Почта</label>
          <input className='form-control' value={user.mail} readOnly />
        </div>
        <div className='mb-2'>
          <label className='form-label'>Баланс</label>
          <input className='form-control' value={user.balance} readOnly />
        </div>
        <div className='mb-2'>
          <label className='form-label'>Роль</label>
          <InlineError field='role' errors={errors} />
          <select
            value={role}
            className='form-select'
            onChange={(event) => setRole(event.target.value)}
          >
            {Object.keys(ROLES).map((key) => (
              <option key={key} value={key}>
                {ROLES[key]}
              </option>
            ))}
          </select>
        </div>
        <button className='btn btn-primary btn-sm mb-2' type='submit'>
          Отправить
        </button>
        <Link className='btn btn-warning btn-sm' to='..'>
          Назад
        </Link>
      </form>
    </div>
  );
}
