import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { keyService } from '../../../services/KeyService';
import { Link } from 'react-router-dom';
import '../../../styles/Crud.css';
import { orderService } from '../../../services/OrderService';

export default function TableOrder() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const fetchData = () => {
    orderService
      .getOrders()
      .then((response) => setOrders(response.data.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  function deleteOrder(id) {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      orderService
        .deleteOrder(id)
        .then((response) => setOrders(orders.filter((key) => key.id !== id)))
        .catch((error) => console.log(error.data.message));
    }
  }

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
    </div>
  );
}
