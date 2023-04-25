import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Navigation from './components/Navigation/Navigation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Center from './components/MainPage/Center/Center';
import Login from './components/Login/Login';
import Admin from './components/Admin/Admin';
import TableGenge from './components/Admin/Genre/TableGenge';
import TableGame from './components/Admin/Game/TableGame';
import EditGenre from './components/Admin/Genre/EditGenre';
import CreateGenre from './components/Admin/Genre/CreateGenre';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path='/' element={<Center />} />
      <Route path='/login' element={<Login />} />
      <Route path='/admin' element={<Admin />}>
        <Route path='genres'>
          <Route path='' element={<TableGenge />} />
          <Route path='create' element={<CreateGenre />} />
          <Route path='edit/:id' element={<EditGenre />} />
        </Route>
        <Route path='games' element={<TableGame />} />
        <Route path='developers' />
        <Route path='publishers' />
        <Route path='users' />
        <Route path='keys' />
      </Route>
      <Route path='*' />
    </Routes>
  </Router>
);
