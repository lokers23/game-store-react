import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function EditGenre() {
  const { id } = useParams();
  return (
    <div>
      <h1> HELLO EDIT GENRE {id}</h1>
      <Link to='..'>Назад</Link>
    </div>
  );
}
