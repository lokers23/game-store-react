import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { keyService } from '../../../services/KeyService';
import { Link } from 'react-router-dom';
import '../../../styles/Crud.css';
import { orderService } from '../../../services/OrderService';
import Pagination from '../../Pagination/Pagination';

export default function TableOrder() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const fetchData = () => {
    orderService
      .getOrders(page, pageSize)
      .then((response) => {
        setOrders(response.data.data);
        setHasNextPage(response.data.hasNextPage);
        setHasPreviousPage(response.data.hasPreviousPage);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  function deleteOrder(id) {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      orderService
        .deleteOrder(id)
        .then((response) => setOrders(orders.filter((key) => key.id !== id)))
        .catch((error) => console.log(error.data.message));
    }
  }

  const handlePageChange = (value) => {
    setPage(value);
  };

  return (
    <div className='container-fluid'>
      <h2 className='mb-2'>Заказы</h2>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Пользователь</th>
            <th scope='col'>Дата</th>
            <th scope='col'>Игры</th>
            <th scope='col'>Сумма</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                {order.user ? <td>{order.user.login}</td> : <td></td>}
                <td>{order.payOn}</td>
                <td>
                  {order.keys.length > 0 &&
                    order.keys.map((key, index) => (
                      <span key={key.id}>
                        {key.game && key.game.name}
                        {index < order.keys.length - 1 && <>, </>}
                      </span>
                    ))}
                </td>
                <td>${order.amount}</td>
                <td>
                  <button
                    className='btn btn-danger btn-sm me-1'
                    onClick={() => deleteOrder(order.id)}
                  >
                    <i className='bi-trash-fill' />
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
