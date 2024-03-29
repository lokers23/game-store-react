import { Route } from 'react-router-dom';
import { TableGame, CreateGame, EditGame } from './components/Admin/Game/Game';

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
import {
  TableMinSpecification,
  CreateMinSpecification,
  EditMinSpecification
} from './components/Admin/MinSpecification/MinSpecification';

import { TableKey, CreateKey, EditKey } from './components/Admin/Key/Key';
import TableOrder from './components/Admin/Order/TableOrder';
import TableUser from './components/Admin/User/TableUser';
import ChangeRoleForm from './components/Admin/User/ChangeRoleForm';
import OrderInfo from './components/Admin/Order/OrderInfo';

export default function AdminRoutes() {
  return (
    <>
      <Route path='games'>
        <Route path='' element={<TableGame />} />
        <Route path='create' element={<CreateGame />} />
        <Route path='edit/:id' element={<EditGame />} />
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
      <Route path='minSpecifications'>
        <Route path='' element={<TableMinSpecification />} />
        <Route path='create' element={<CreateMinSpecification />} />
        <Route path='edit/:id' element={<EditMinSpecification />} />
      </Route>
      <Route path='keys'>
        <Route path='' element={<TableKey />} />
        <Route path='create' element={<CreateKey />} />
        <Route path='edit/:id' element={<EditKey />} />
      </Route>
      <Route path='orders'>
        <Route path='' element={<TableOrder />} />
        <Route path='info/:id' element={<OrderInfo />} />
      </Route>
      <Route path='users'>
        <Route path='' element={<TableUser />} />
        <Route path=':id/role' element={<ChangeRoleForm />} />
      </Route>
    </>
  );
}
