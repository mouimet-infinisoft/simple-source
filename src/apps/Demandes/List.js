import React, { useEffect, useMemo, useState } from "react";
import Header from "../../layouts/Header";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Button, Card, Col, Dropdown, Nav, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useBrainStack } from "../../App";

function countStatus(demandes) {
  return Object.values(demandes).reduce((acc, demande) => {
    acc[demande.status] = (acc[demande.status] || 0) + 1;
    return acc;
  }, {});
}

export default function DemandesList() {
  const bstack = useBrainStack();
  const { list } = bstack.store.createCRUDObject('demandes')
  const statusCount = useMemo(() => countStatus(list()), [list()]);

  useEffect(() => {
    document.body.classList.add('page-app');
    return () => {
      document.body.classList.remove('page-app');
    }
  }, []);

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
  const [isSidebarShow, setSidebarShow] = useState(false);

  return (
    <React.Fragment>
      <Header />
      <div className={"main main-file-manager" + (isSidebarShow ? " show" : "")}>
        <PerfectScrollbar className="file-sidebar">
          <div className="d-grid mb-4">
            <Button variant="primary" href="">Nouvelle</Button>
          </div>

          <label className="sidebar-label mb-2">Filtres</label>
          <Nav className="nav-sidebar mb-4">
            <Nav.Link href="" className="active"><i className="ri-asterisk"></i> Tous</Nav.Link>
            <Nav.Link href=""><i className="ri-time-line"></i> En attentes</Nav.Link>
            <Nav.Link href=""><i className="ri-loader-2-line"></i> En cours</Nav.Link>
            <Nav.Link href=""><i className="ri-checkbox-circle-line"></i> Terminées</Nav.Link>
            <Nav.Link href=""><i className="ri-close-circle-line"></i> Fermées</Nav.Link>
          </Nav>
        </PerfectScrollbar>

        <PerfectScrollbar className="file-content p-3 p-lg-4">
          <h1>Demandes</h1>
          <Row className="g-3 mb-3">

            <Col xs="6" sm>
              <Card className="card-one">
                <Card.Body className="p-3">
                  <div className="d-block fs-40 lh-1 text-primary mb-1">
                    <i className="ri-time-line"></i>
                  </div>
                  <h1 className="card-value mb-0 ls--1 fs-32">{statusCount?.["En attente"] ?? "0"}</h1>
                  <label className="d-block mb-1 fw-medium text-dark">En attentes</label>
                  <small>
                    <span className="d-inline-flex text-danger">0.7% <i className="ri-arrow-down-line"></i></span> depuis la semaine dernière
                  </small>
                </Card.Body>
              </Card>
            </Col>

            <Col xs="6" sm>
              <Card className="card-one">
                <Card.Body className="p-3">
                  <div className="d-block fs-40 lh-1 text-ui-02 mb-1">
                    <i className="ri-loader-2-line"></i>
                  </div>
                  <h1 className="card-value mb-0 fs-32 ls--1">{statusCount?.["En cours"] ?? "0"}</h1>
                  <label className="d-block mb-1 fw-medium text-dark">En cours</label>
                  <small><span className="d-inline-flex text-success">1.2% <i className="ri-arrow-up-line"></i></span> depuis la semaine dernière</small>
                </Card.Body>
              </Card>
            </Col>

            <Col sm>
              <Card className="card-one">
                <Card.Body className="p-3">
                  <div className="d-block fs-40 lh-1 text-ui-02 mb-1">
                    <i className="ri-checkbox-circle-line"></i>
                  </div>
                  <h1 className="card-value mb-0 fs-32 ls--1">{statusCount?.["Terminée"] ?? "0"}</h1>
                  <label className="d-block mb-1 fw-medium text-dark">Terminées</label>
                  <small><span className="d-inline-flex text-success">0.6% <i className="ri-arrow-up-line"></i></span> depuis la semaine dernière</small>
                </Card.Body>
              </Card>
            </Col>

            <Col sm>
              <Card className="card-one">
                <Card.Body className="p-3">
                  <div className="d-block fs-40 lh-1 text-ui-02 mb-1">
                    <i className="ri-close-circle-line"></i>
                  </div>
                  <h1 className="card-value mb-0 fs-32 ls--1">{statusCount?.["Fermée"] ?? "0"}</h1>
                  <label className="d-block mb-1 fw-medium text-dark">Fermées</label>
                  <small><span className="d-inline-flex text-success">0.6% <i className="ri-arrow-up-line"></i></span> depuis la semaine dernière</small>
                </Card.Body>
              </Card>
            </Col>

          </Row>



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


              {Object.values(list()).map(file => (
                <tr key={file.id}>
                  <td>
                    <div className={"media-icon " + file.color}>
                      <i className={file.icon}></i>
                    </div>

                  </td>
                  <td>
                    <h6 className="file-name">
                      <Link href="">{file.reference}</Link>
                    </h6>
                  </td>
                  <td><div>{file.created}</div></td>
                  <td><div>{file.status}</div></td>
                  <td><div>{file.contacts.join(', ')}</div></td>
                  <td><div>{file.service}</div></td>
                  <td>
                    <Dropdown align="end" className="dropdown-file">
                      <Dropdown.Toggle as={CustomToggle}>
                        <i className="ri-more-2-fill"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#" className="details">
                          <i className="ri-information-line"></i> Ouvrir
                        </Dropdown.Item>
                        <Dropdown.Item href="#" className="move">
                          <i className="ri-time-line"></i> En attente
                        </Dropdown.Item>
                        <Dropdown.Item href="#" className="rename">
                          <i className="ri-checkbox-circle-line"></i> Terminer
                        </Dropdown.Item>
                        <Dropdown.Item href="#" className="delete">
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