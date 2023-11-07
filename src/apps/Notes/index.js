import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotesList from './pages/NotesList';
import NotesEditor from './pages/NotesEditor';
import Notes from './pages/ReportNotes';

export function NotesRoutes() {
  return (
    <Routes>
      <Route path="/" element={<NotesList />} />
      <Route path=":noteId" element={<NotesEditor />} />
    </Routes>
  );
}

export function ReportNotesRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Notes />} />
      {/* <Route path=":noteId" element={<NotesEditor />} /> */}
    </Routes>
  );
}
