import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UsersList from './pages/UsersList';
import UsersEditor from './pages/UsersEditor';

function UsersManagement() {
  return (
    <Routes>
      <Route path="/" element={<UsersList />} />
      <Route path=":userId" element={<UsersEditor />} />
    </Routes>
  );
}

export default UsersManagement;
