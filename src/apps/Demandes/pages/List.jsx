import React from 'react';
import Header from '../../../layouts/Header';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Dropdown, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getValue } from '../../../App';
import FileSidebar from '../../../components/atoms/FileSidebar';
import { useDemandsList, sidebar, header } from './useDemandsList';
import Stats from '../../../components/atoms/Stats';

export default function DemandesList() {
  const {
    search,
    isSidebarShow,
    statusCount,
    onClickFilter,
    onCreate,
    onChangeStatus,
    isActive,
  } = useDemandsList();

  const cards = header.map((x) => ({ ...x, count: statusCount?.[x.id] || 0 }));

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="dropdown-link"
    >
      {children}
    </Link>
  ));

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

          <Table className="table table-files" responsive>
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th>Numéro</th>
                <th>Créé</th>
                <th>Statut</th>
                <th>Contacts</th>
                <th>Service</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(search(getValue('search'))).map((file) => (
                <tr key={file.id}>
                  <td>
                    <div className={'media-icon ' + file.color}>
                      <i className={file.icon}></i>
                    </div>
                  </td>
                  <td>
                    <h6 className="file-name">
                      <Link to={`/apps/demandes/${file.id}`}>
                        {' '}
                        {file.reference}
                      </Link>
                    </h6>
                  </td>
                  <td>
                    <div>{file.created}</div>
                  </td>
                  <td>
                    <div>{file.status}</div>
                  </td>
                  <td>
                    <div>
                      {file?.contacts
                        ?.map(({ id }) => getValue(`contacts.${id}.name`))
                        ?.join(', ') ?? ''}
                    </div>
                  </td>
                  <td>
                    <div>{file.service}</div>
                  </td>
                  <td>
                    <Dropdown align="end" className="dropdown-file">
                      <Dropdown.Toggle as={CustomToggle}>
                        <i className="ri-more-2-fill"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item className="details">
                          <Link to={`/apps/demandes/${file.id}`}>
                            {' '}
                            <i className="ri-information-line"></i> Ouvrir
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#"
                          className="move"
                          onClick={onChangeStatus(file, 'En attente')}
                        >
                          <i className="ri-time-line"></i> En attente
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#"
                          className="rename"
                          onClick={onChangeStatus(file, 'Terminée')}
                        >
                          <i className="ri-checkbox-circle-line"></i> Terminer
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#"
                          className="delete"
                          onClick={onChangeStatus(file, 'Fermée')}
                        >
                          <i className="ri-close-circle-line"></i> Fermer
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </PerfectScrollbar>
      </div>
    </React.Fragment>
  );
}
