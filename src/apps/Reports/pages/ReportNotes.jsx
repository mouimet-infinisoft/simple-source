import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import Header from '../../../layouts/Header';
import FileSidebar from '../../../components/atoms/FileSidebar';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useNotes, sidebar, headValues } from '../../Notes/pages/useNotes';
import Table from '../../../components/atoms/Table';
import { Link } from 'react-router-dom';

export function NotesListComponent() {
  const { items, isActive, onChangeStatus, onCheckToggle, onClickFilter } =
    useNotes();

  const generateReport = () => {
    alert('Creating PDF file...');
  };

  return (
    <React.Fragment>
      <div className="file-sidebar">
        <FileSidebar
          isActive={isActive}
          onCreate={generateReport}
          onClickFilter={onClickFilter}
          links={sidebar}
          filterLabel="Filtres"
          buttonCreateLabel="Générer un rapport"
        />
      </div>

      <PerfectScrollbar className="file-content p-3 p-lg-4">
        <h1>Rapporte</h1>

        <Table
          checkBoxes={true}
          items={items}
          header={headValues}
          route="/apps/notes"
          Link={Link}
          onChangeStatus={onChangeStatus}
          onCheckToggle={onCheckToggle}
        />
      </PerfectScrollbar>
    </React.Fragment>
  );
}

export default function NotesList() {
  return (
    <React.Fragment>
      <Header />

      <div className={'main main-file-manager show'}>
        <NotesListComponent />
      </div>
    </React.Fragment>
  );
}
