import React, { useEffect, useState } from "react";
import Header from "../../../layouts/Header";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Button, Dropdown, Nav,  Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { createEventHandlerMutatorShallow, getValue, useBrainStack } from "../../../App";
import DemandesStats from "../components/DemandesStats";
import { defaultModel } from "../assets/datamock";
import FileSidebar from "../../../components/atoms/FileSidebar";

const sidebar = [
  { icon: 'ri-asterisk', id: '', label: 'Tous' },
  { icon: 'ri-time-line', id: 'En attente', label: 'En attente' },
  { icon: 'ri-loader-2-line', id: 'En cours', label: 'En cours' },
  { icon: 'ri-checkbox-circle-line', id: 'Terminée', label: 'Terminée' },
  { icon: 'ri-close-circle-line', id: 'Fermée', label: 'Fermée' },
];

export default function DemandesList() {
  const bstack = useBrainStack();
  const navigate = useNavigate()
  const { search, update, create } = bstack.store.createCRUDObject('dossiers')

  // useEffect(() => {
  //   document.body.classList.add('page-app');
  //   return () => {
  //     document.body.classList.remove('page-app');
  //   }
  // }, []);

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

  // toggle sidebar in mobile
  // const [isSidebarShow, setSidebarShow] = useState(false);

  const isActive = (_value) => getValue('search') === _value ? "active" : ""
  const onClickFilter = (_value) => () => { createEventHandlerMutatorShallow('search')(_value) }
  const onChangeStatus = (_value, status) => () => { update({ ..._value, status }) }

  const onCreate = () => {
    const c = create(defaultModel())
    navigate(`/apps/dossiers/${c.id}`)
  }

  return (
    <React.Fragment>
      <Header />
      <div className={"main main-file-manager"}>
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
          <h1>Dossiers</h1>
          <DemandesStats list={bstack.list}/>


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


              {Object.values(search(getValue('search'))).map(file => (
                <tr key={file.id}>
                  <td>
                    <div className={"media-icon " + file.color}>
                      <i className={file.icon}></i>
                    </div>

                  </td>
                  <td>
                    <h6 className="file-name">
                      <Link to={`/apps/dossiers/${file.id}`}> {file.reference}</Link>
                    </h6>
                  </td>
                  <td><div>{file.created}</div></td>
                  <td><div>{file.status}</div></td>
                  <td><div>{file?.contacts?.map(({ id }) => getValue(`contacts.${id}.name`))?.join(', ') ?? ""}</div></td>
                  <td><div>{file.service}</div></td>
                  <td>
                    <Dropdown align="end" className="dropdown-file">
                      <Dropdown.Toggle as={CustomToggle}>
                        <i className="ri-more-2-fill"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item className="details">
                          <Link to={`/apps/demandes/${file.id}`}> <i className="ri-information-line"></i> Ouvrir</Link>
                        </Dropdown.Item>
                        <Dropdown.Item href="#" className="move" onClick={onChangeStatus(file, "En attente")}>
                          <i className="ri-time-line"></i> En attente
                        </Dropdown.Item>
                        <Dropdown.Item href="#" className="rename" onClick={onChangeStatus(file, "Terminée")}>
                          <i className="ri-checkbox-circle-line"></i> Terminer
                        </Dropdown.Item>
                        <Dropdown.Item href="#" className="delete" onClick={onChangeStatus(file, "Fermée")}>
                          <i className="ri-close-circle-line"></i> Fermer
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))
              }

            </tbody>
          </Table>

        </PerfectScrollbar>
      </div>
    </React.Fragment>
  )
}