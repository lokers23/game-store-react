import '../../styles/pagination.css';

function Pagination({ page, hasNextPage, hasPreviousPage, onChange }) {
  return (
    <div className='mb-5'>
      <button
        className='btn btn-sm me-2 page'
        onClick={() => onChange(page - 1)}
        disabled={!hasPreviousPage}
      >
        Пред
      </button>
      <span className='me-2'>Стр. {page}</span>
      <button
        className='btn btn-sm page'
        onClick={() => onChange(page + 1)}
        disabled={!hasNextPage}
      >
        След
      </button>
    </div>
  );
}

export default Pagination;
