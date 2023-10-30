import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link } from 'react-router-dom';
import { useUsers, sidebar, header, headValues, more } from './useUsers';
import Header from '../../layouts/Header';
import FileSidebar from '../../components/atoms/FileSidebar';
import Stats from '../../components/atoms/Stats';
import Table from '../../components/atoms/Table';

export default function UsersList() {
  const {
    items,
    statusCount,
    isActive,
    onCreate,
    onClickFilter,
    onChangeStatus,
  } = useUsers();

  const cards = header.map((x) => ({ ...x, count: statusCount?.[x.id] || 0 }));

  return (
    <>
      <Header />

      <div className={'main main-file-manager show'}>
        <div className="file-sidebar">
          <FileSidebar
            isActive={isActive}
            onCreate={onCreate}
            onClickFilter={onClickFilter}
            links={sidebar}
            filterLabel="Filtres"
            buttonCreateLabel="Nouvel employé"
          />
        </div>

        <PerfectScrollbar className="file-content p-3 p-lg-4">
          <h1>Employé</h1>

          <Stats cards={cards} />

          <Table
            items={items}
            header={headValues}
            route="/apps/staff"
            Link={Link}
            moreContext={more}
            onChangeStatus={onChangeStatus}
          />
        </PerfectScrollbar>
      </div>
    </>
  );
}
