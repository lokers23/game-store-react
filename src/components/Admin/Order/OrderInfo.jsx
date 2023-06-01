import { useEffect, useState } from 'react';
import { orderService } from '../../../services/OrderService';
import { Link, useParams } from 'react-router-dom';
import '../../../styles/admin-form.css';

function OrderInfo() {
  const { id } = useParams();

  const [order, setOrder] = useState({});

  useEffect(() => {
    orderService
      .getOrderById(id)
      .then((response) => setOrder(response.data.data))
      .catch();
  }, [id]);

  return (
    <div className='container-fluid mb-5 p-5'>
      <div className='mx-auto my-auto' style={{ maxWidth: '600px' }}>
        <div className='border border-1 rounded border-dark shadow mx-auto my-auto p-3 mb-2'>
          <div className='d-flex mb-3'>
            <div>
              <p>
                <b className='me-2'>Логин:</b>
                {order.user && order.user.login}
              </p>
              <p>
                <b className='me-2'>Почта:</b>
                {order.user && order.user.mail}
              </p>
            </div>
            <div className='ms-auto'>
              <p>
                <b className='me-2'>Дата покупки:</b>{' '}
                {new Date(order.payOn).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
          <div>
            <h5 className='text-center mb-4'>Ключи в заказе</h5>
            <div className='d-flex flex-column  align-items-center'>
              {order.keys &&
                order.keys.length > 0 &&
                order.keys.map((key, index) => (
                  <div key={index} className='mb-3 d-flex align-items-center'>
                    <div className='me-2'>
                      <input
                        className='form-control text-center'
                        value={
                          key.game &&
                          `${key.game.name} (${key.game.activation.name})`
                        }
                        style={{ minWidth: '270px' }}
                        readOnly
                      />
                    </div>
                    &ndash;
                    <div className='ms-2'>
                      <input
                        className='form-control text-center '
                        style={{ minWidth: '270px' }}
                        value={key.value}
                        readOnly
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <Link to={'..'} className='btn btn-sm back-button w-100'>
          Назад
        </Link>
      </div>
    </div>
  );
}

export default OrderInfo;
