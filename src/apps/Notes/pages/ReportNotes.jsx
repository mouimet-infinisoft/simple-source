import React from 'react';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Header from '../../../layouts/Header';
import FileSidebar from '../../../components/atoms/FileSidebar';
import Table from '../../../components/atoms/Table';

import { useNotes, sidebar, headValues } from './useNotes';

export function NotesListComponent() {
  const {
    items,
    checked,
    isActive,
    onChangeStatus,
    navigateTo,
    onCheckToggle,
    onClickFilter,
  } = useNotes();

  const generateReport = () => {
    const selected = items.filter((x) => x.checked);
    if (selected) {
      navigateTo('/apps/reports/edit', checked);
    }
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
