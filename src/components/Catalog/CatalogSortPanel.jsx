import { useState } from 'react';

function CatalogSortPanel({ onSortChange }) {
  const [sortDate, setSortDate] = useState(true);
  const [sortPrice, setSortPrice] = useState(true);
  const [sortName, setSortName] = useState(true);

  function handleSortDate(event) {
    event.preventDefault();
    const date = sortDate ? 'date' : 'date_desc';
    setSortDate((prev) => !prev);
    onSortChange(date);
  }

  function handleSortPrice(event) {
    event.preventDefault();
    const price = sortPrice ? 'price' : 'price_desc';
    setSortPrice((prev) => !prev);
    onSortChange(price);
  }

  function handleSortName(event) {
    event.preventDefault();
    const name = sortName ? 'name' : 'name_desc';
    setSortName((prev) => !prev);
    onSortChange(name);
  }

  return (
    <div>
      <h5>Сортировать по:</h5>
      <div className='mb-2'>
        <button
          className='btn btn-secondary me-2'
          onClick={(event) => handleSortDate(event)}
        >
          Дате выхода
        </button>
        <button
          className='btn btn-secondary me-2'
          onClick={(event) => handleSortPrice(event)}
        >
          Цене
        </button>
        <button
          className='btn btn-secondary'
          onClick={(event) => handleSortName(event)}
        >
          Названию
        </button>
      </div>
    </div>
  );
}

export default CatalogSortPanel;
