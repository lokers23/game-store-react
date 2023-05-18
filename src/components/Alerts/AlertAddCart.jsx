import { useState } from 'react';

function AlertAddCart({ text }) {
  console.log(text);
  if (text === '') return null;
  function closeAlert(e) {
    e.preventDefault();
  }

  return (
    <div
      className='alert alert-success alert-dismissible fade show fw-bold'
      role='alert'
    >
      {text}
    </div>
  );
}

export default AlertAddCart;
