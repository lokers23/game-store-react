import { useEffect, useState } from 'react';
import { orderService } from '../../services/OrderService';
//import { gameService } from '../../services/GameService';

function Purchases() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    orderService
      .getOrdersByUser()
      .then((response) => setPurchases(response.data.data))
      .catch();
  }, []);

  function getTotalPrice() {
    const newTotalPrice = purchases.reduce(
      (total, purchase) => total + purchase.amount,
      0
    );
    return newTotalPrice.toFixed(2);
  }

  return (
    <div className=''>
      {purchases.length > 0 ? (
        <div className=' d-flex flex-column'>
          <div className='shadow p-3 mb-3 bg-white rounded'>
            <h3>Ваши покупки</h3>
          </div>

          <div className=''>
            {purchases.length > 0 &&
              purchases.map((purchase, index) => (
                <div
                  key={purchase.id}
                  className='shadow p-3 mb-3 bg-white rounded'
                >
                  <h2>{index + 1}</h2>
                  {purchase.keys.length > 0 &&
                    purchase.keys.map((key) => (
                      <div
                        key={key.id}
                        className='d-flex justify-content-between border-bottom border-2 align-items-center mb-2'
                        style={{ height: '100px' }}
                      >
                        <div>
                          <label className='form-label'>Игра</label>
                          <input
                            className='text-center fw-bold form-control'
                            type='text'
                            value={key.game.name}
                            readOnly
                          ></input>
                        </div>

                        <div>
                          <label className='form-label'>Ключ</label>
                          <input
                            className='text-center fw-bold form-control'
                            type='text'
                            value={key.value}
                            readOnly
                          ></input>
                        </div>
                      </div>
                    ))}
                  <p className='fw-bold'>Стоимость: {purchase.amount}$</p>
                  <div className='card-footer text-end'>
                    {new Date(purchase.payOn).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              ))}
          </div>
          <p className='fw-bold fs-5 shadow p-3 mb-5 bg-white rounded'>
            Общая сумма покупок: ${getTotalPrice()}
          </p>
        </div>
      ) : (
        <div>
          <h1
            className='text-center shadow bordered rounded'
            style={{ minHeight: '300px' }}
          >
            Покупок нет
          </h1>
        </div>
      )}
    </div>
  );
}

export default Purchases;
