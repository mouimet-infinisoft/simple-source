import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotesList from './NotesList';
import NotesEditor from './NotesEditor';

function NotesRoutes() {
    return (
        <Routes>
            <Route path="/" element={<NotesList />} />
            <Route path=":noteId/edit" element={<NotesEditor />} />
        </Routes>
    );
}
export default NotesRoutes;
