import * as React from 'react';

export const InlineError = ({ field, errors }) => {
  if (!errors) {
    return null;
  }

  if (!errors[field]) {
    return null;
  }

  return (
    <div className='alert alert-danger fade show' role='alert'>
      <ul className='list-group list-group-flush'>
        {errors[field].map((error, index) => (
          <li
            className='list-group-item list-group-item-danger fw-bold'
            key={index}
          >
            {error}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InlineError;
