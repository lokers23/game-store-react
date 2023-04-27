import { Route, Routes } from 'react-router-dom';
import TableGame from './components/Admin/Game/TableGame';

import {
  TableGenre,
  CreateGenre,
  EditGenre
} from './components/Admin/Genre/Genre';

import {
  TableDeveloper,
  EditDeveloper,
  CreateDeveloper
} from './components/Admin/Developer/Developer';

import {
  TablePublisher,
  CreatePublisher,
  EditPublisher
} from './components/Admin/Publisher/Publisher';

import {
  TableActivation,
  CreateActivation,
  EditActivation
} from './components/Admin/Activation/Activation';

import {
  TablePlatform,
  CreatePlatform,
  EditPlatform
} from './components/Admin/Platform/Platform';

export default function AdminRoutes() {
  return (
    <>
      <Route path='games'>
        <Route path='' element={<TableGame />} />
      </Route>
      <Route path='genres'>
        <Route path='' element={<TableGenre />} />
        <Route path='create' element={<CreateGenre />} />
        <Route path='edit/:id' element={<EditGenre />} />
      </Route>
      <Route path='developers'>
        <Route path='' element={<TableDeveloper />} />
        <Route path='create' element={<CreateDeveloper />} />
        <Route path='edit/:id' element={<EditDeveloper />} />
      </Route>
      <Route path='publishers'>
        <Route path='' element={<TablePublisher />} />
        <Route path='create' element={<CreatePublisher />} />
        <Route path='edit/:id' element={<EditPublisher />} />
      </Route>
      <Route path='activations'>
        <Route path='' element={<TableActivation />} />
        <Route path='create' element={<CreateActivation />} />
        <Route path='edit/:id' element={<EditActivation />} />
      </Route>
      <Route path='platforms'>
        <Route path='' element={<TablePlatform />} />
        <Route path='create' element={<CreatePlatform />} />
        <Route path='edit/:id' element={<EditPlatform />} />
      </Route>
      <Route path='keys'>
        {/* <Route path='' element={<TablePublisher />} />
          <Route path='create' element={<CreatePublisher />} />
          <Route path='edit/:id' element={<EditPublisher />} /> */}
      </Route>
    </>
  );
}
