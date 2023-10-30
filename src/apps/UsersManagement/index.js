import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UsersList from './UsersList';
import UsersEditor from './UsersEditor';

function UsersManagementRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UsersList />} />
      <Route path=":id" element={<UsersEditor />} />
    </Routes>
  );
}
export default UsersManagementRoutes;
