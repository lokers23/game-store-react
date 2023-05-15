import { useState } from 'react';

function Profile() {
  const [purchases, setPurchases] = useState([]);
  return (
    <div>
      <div>
        {purchases.length > 0 ? (
          <div>
            <h1>Ваши покупки</h1>

            <p>Общая сумма покупок: </p>
          </div>
        ) : (
          <div>
            <h1 className='text-center'>Покупок нет</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
