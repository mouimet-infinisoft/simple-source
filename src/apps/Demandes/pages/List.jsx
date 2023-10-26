import React from 'react';
import Header from '../../../layouts/Header';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link } from 'react-router-dom';
import FileSidebar from '../../../components/atoms/FileSidebar';
import {
  useDemandsList,
  sidebar,
  header,
  headValues,
  more,
} from './useDemandsList';
import Stats from '../../../components/atoms/Stats';
import Table from '../../../components/atoms/Table';

export default function DemandesList() {
  const {
    items,
    isSidebarShow,
    statusCount,
    isActive,
    onClickFilter,
    onCreate,
    onChangeStatus,
  } = useDemandsList();

  const cards = header.map((x) => ({ ...x, count: statusCount?.[x.id] || 0 }));

  return (
    <React.Fragment>
      <Header />

      <div
        className={'main main-file-manager' + (isSidebarShow ? ' show' : '')}
      >
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
          <h1>Demandes</h1>

          <Stats cards={cards} />

          <Table
            items={items}
            header={headValues}
            route="/apps/demandes"
            Link={Link}
            moreContext={more}
            onChangeStatus={onChangeStatus}
          />
        </PerfectScrollbar>
      </div>
    </React.Fragment>
  );
}
