function Pagination({ page, hasNextPage, hasPreviousPage, onChange }) {
  return (
    <div>
      <button
        className='btn btn-primary btn-sm me-2'
        onClick={() => onChange(page - 1)}
        disabled={!hasPreviousPage}
      >
        Пред
      </button>
      <span className='me-2'>Стр. {page}</span>
      <button
        className='btn btn-primary btn-sm'
        onClick={() => onChange(page + 1)}
        disabled={!hasNextPage}
      >
        След
      </button>
    </div>
  );
}

export default Pagination;
