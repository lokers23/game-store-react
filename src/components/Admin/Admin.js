import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Admin() {
  return (
    <>
      <h1>ADMIN</h1>
      <Link to='genres'>Genre</Link>
      <Link to='games'>Games</Link>
      <Link to='developers'>Developers</Link>
      <Outlet />
    </>
  );
}
