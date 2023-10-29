import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link } from 'react-router-dom';

import Header from '../../../layouts/Header';
import FileSidebar from '../../../components/atoms/FileSidebar';
import Stats from '../../../components/atoms/Stats';
import Table from '../../../components/atoms/Table';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useNotes, sidebar, header, headValues, more } from './useNotes';


export function NotesListComponent() {
  const {
    items,
    isActive,
    statusCount,
    onCreate,
    onChangeStatus,
    onClickFilter,
  } = useNotes();

  const cards = header.map((x) => ({ ...x, count: statusCount?.[x.id] || 0 }));

  return (
    <React.Fragment>
      <div className="file-sidebar">
        <FileSidebar
          isActive={isActive}
          onCreate={onCreate}
          onClickFilter={onClickFilter}
          links={sidebar}
          filterLabel="Filtres"
          buttonCreateLabel="Nouvelle"
        />
      </div>

      <PerfectScrollbar className="file-content p-3 p-lg-4">
        <h1>Notes</h1>

        <Stats cards={cards} />

        <Table
          items={items}
          header={headValues}
          route="/apps/notes"
          Link={Link}
          moreContext={more}
          onChangeStatus={onChangeStatus}
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
