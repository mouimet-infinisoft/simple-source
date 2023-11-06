import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Notes from '../Notes/pages/ReportNotes';
// import NotesEditor from './pages/NotesEditor';

function NotesRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Notes />} />
      {/* <Route path=":noteId" element={<NotesEditor />} /> */}
    </Routes>
  );
}
export default NotesRoutes;
