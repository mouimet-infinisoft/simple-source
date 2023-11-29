import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Nav, Row, Form, Button } from 'react-bootstrap';
import Footer from '../layouts/Footer';
import HeaderMobile from '../layouts/HeaderMobile';
import img1 from '../assets/img/img1.jpg';
import { createEventHandlerMutator, getValue, useBrainStack } from '../App';

export default function Profile() {
  const bstack = useBrainStack();
  const profileData = {
    id: 2,
    name: "Alice Tremblay",
    employeeID: "E002",
    department: "HR",
    role: "HR Manager",
    email: "alice.tremblay@example.com",
    contactNumber: "+1122334455",
    hireDate: "2020-05-15",
    status: "Activé",
    address: "5678 Oak Street, City, State, Zip",
    emergencyContact: {
      name: "Marc Tremblay",
      relation: "Sibling",
      contactNumber: "+2233445566"
    }
  }
  return (
    <React.Fragment>
      <HeaderMobile />
      <div className="main p-4 p-lg-5">
        <div className="py-4 mb-2 bg-body-tertiary rounded-3">
          <div className="container-fluid">
            <h1><Link to='/dashboard/events'><i className="ri-arrow-left-line"></i></Link> Mon profile</h1>
          </div>
        </div>
        <Row className="g-5">
          <Col xl>
            <div className="media-profile mb-5">
              <div className="media-img mb-3 mb-sm-0">
                <img src={getValue(`me.avatar`)} className="img-fluid" alt="..." />
              </div>
              <div className="media-body">
                <h5 className="media-name">{getValue(`me.name`)}</h5>
                <p className="d-flex gap-2 mb-4">
                  <i className="ri-map-pin-line"></i>{' '}
                  <Form.Control
                    type="text"
                    placeholder="Mon adresse"
                    value={getValue(`me.address`)}
                    onChange={createEventHandlerMutator('me.address')}
                  />
                </p>
              </div>
            </div>

            <Row className="row-cols-sm-auto g-4 g-md-5 g-xl-4 g-xxl-5">
              {[
                {
                  icon: 'ri-question-answer-line',
                  text: '5',
                  label: 'Demandes',
                },
                {
                  icon: 'ri-folder-line',
                  text: '10',
                  label: 'Dossiers',
                },
                {
                  icon: 'ri-calendar-line',
                  text: '35',
                  label: 'Rendez-vous',
                },
                {
                  icon: 'ri-checkbox-multiple-line',
                  text: '14',
                  label: 'Tâches',
                },
              ].map((profileItem, index) => (
                <Col key={index}>
                  <div className="profile-item">
                    <i className={profileItem.icon}></i>
                    <div className="profile-item-body">
                      <p className="text-center">{profileItem.text}</p>
                      <span>{profileItem.label}</span>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

            <Nav className="nav-line mt-5">
              <Nav.Link href="" className="active">Personal Information</Nav.Link>
              {/* <Nav.Link href="">Connections</Nav.Link>
              <Nav.Link href="">Profile Settings</Nav.Link> */}
            </Nav>

            <Card className="card-settings">
              <Card.Header>
                <Card.Title>Mes Informations</Card.Title>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="setting-item">
                  <Row className="g-2 align-items-center">
                    <Col md="5">
                      <h6>Nom</h6>
                      <p>Votre nom complet</p>
                    </Col>
                    <Col md>
                      <Form.Control
                        type="text"
                        placeholder="Entrez votre nom"
                        value={getValue(`me.name`)}
                        onChange={createEventHandlerMutator('me.name')}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="setting-item">
                  <Row className="g-2 align-items-center">
                    <Col md="5">
                      <h6>Identifiant Employé</h6>
                      <p>Vous êtes plus qu'un numéro</p>
                    </Col>
                    <Col md>
                      <Form.Control
                        type="text"
                        placeholder="Entrez votre identifiant employé"
                        value={getValue(`me.employeeID`)}
                        onChange={createEventHandlerMutator('me.employeeID')}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="setting-item">
                  <Row className="g-2 align-items-center">
                    <Col md="5">
                      <h6>Département</h6>
                      <p>Votre affectation.</p>
                    </Col>
                    <Col md>
                      <Form.Control
                        type="text"
                        placeholder="Entrez votre département"
                        value={getValue(`me.department`)}
                        onChange={createEventHandlerMutator('me.department')}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="setting-item">
                  <Row className="g-2 align-items-center">
                    <Col md="5">
                      <h6>Rôle</h6>
                      <p>Votre rôle dans l'organisation.</p>
                    </Col>
                    <Col md>
                      <Form.Control
                        type="text"
                        placeholder="Entrez votre rôle"
                        value={getValue(`me.role`)}
                        onChange={createEventHandlerMutator('me.role')}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="setting-item">
                  <Row className="g-2 align-items-center">
                    <Col md="5">
                      <h6>Email</h6>
                      <p>Votre adresse courriel.</p>
                    </Col>
                    <Col md>
                      <Form.Control
                        type="email"
                        placeholder="Entrez votre email"
                        value={getValue(`me.email`)}
                        onChange={createEventHandlerMutator('me.email')}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="setting-item">
                  <Row className="g-2 align-items-center">
                    <Col md="5">
                      <h6>Numéro de Contact</h6>
                      <p>Numéro de téléphone.</p>
                    </Col>
                    <Col md>
                      <Form.Control
                        type="text"
                        placeholder="Entrez votre numéro de contact"
                        value={getValue(`me.contactNumber`)}
                        onChange={createEventHandlerMutator('me.contactNumber')}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="setting-item">
                  <Row className="g-2 align-items-center">
                    <Col md="5">
                      <h6>Date d'embauche</h6>
                      <p>La date de commencement.</p>
                    </Col>
                    <Col md>
                      <Form.Control
                        type="text"
                        placeholder="Entrez votre date d'embauche"
                        value={getValue(`me.hireDate`)}
                        onChange={createEventHandlerMutator('me.hireDate')}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="setting-item">
                  <Row className="g-2 align-items-center">
                    <Col md="5">
                      <h6>Statut</h6>
                      <p>Le status de votre accès.</p>
                    </Col>
                    <Col md>
                      <Form.Control
                        as="select"
                        value={getValue(`me.status`)}
                        onChange={createEventHandlerMutator('me.status')}
                      >
                        <option value="Activé">Activé</option>
                        <option value="Désactivé">Désactivé</option>
                      </Form.Control>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Footer />
      </div>
    </React.Fragment>
  );
}
