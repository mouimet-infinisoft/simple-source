import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link } from 'react-router-dom';

import Header from '../../../layouts/Header';
import FileSidebar from '../../../components/atoms/FileSidebar';
import Stats from '../../../components/atoms/Stats';
import Table from '../../../components/atoms/Table';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useNotes, sidebar, header, headValues, more } from './useNotes';

export default function NotesList() {
  const {
    items,
    isActive,
    statusCount,
    onCreate,
    onChangeStatus,
    onClickFilter,
  } = useNotes();

  const cards = header.map((x) => ({ ...x, count: statusCount?.[x.id] || 0 }));

  console.log(items)

  return (
    <React.Fragment>
      <Header />

      <div className={'main main-file-manager show'}>
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
      </div>
    </React.Fragment>
  );
}
