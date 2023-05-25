import { useEffect, useState } from 'react';
import { userService } from '../../services/UserService';
import { Link } from 'react-router-dom';

function ContactHelpPage() {
  return (
    <div
      className='d-flex flex-column shadow bordered rounded p-3'
      style={{ minHeight: '300px' }}
    >
      <h2 className='mb-2'>Контакты</h2>
      <div>
        <i className='bi-envelope-fill'></i> <b>Почта: </b>
        support_gameover@mail.ru
      </div>
    </div>
  );
}

export default ContactHelpPage;
