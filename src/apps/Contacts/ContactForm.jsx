import React, { useState } from 'react';
import { Button, Row, Col, Tabs, Tab, Form } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link } from 'react-router-dom';
import Avatar from '../../components/atoms/Avatar';
import ChipArray from '../../components/atoms/ChipArray';
import { createEventHandlerMutator, getValue } from '../../App';

const ContactForm = ({ selectedId, handleShowDeleteContact, handleUpdate }) => {
  const [key, setKey] = useState('step1');

  const Coordinates = () => (
    <>
      <Row className="mt-2">
        <Col xs="2" className="text-secondary">
          Courriels
        </Col>
        <Col>
          <ChipArray
            key={'active-emails-' + selectedId}
            initialItems={getValue(`contacts.${selectedId}.emails`)}
            onItemsChange={(e) => {
              handleUpdate(e, 'emails');
            }}
            placeholder="Ajouter un courriel"
          />
        </Col>
      </Row>

      <Row className="mt-2">
        <Col xs="2" className="text-secondary">
          Téléphones
        </Col>
        <Col>
          <ChipArray
            key={'active-phones-' + selectedId}
            initialItems={getValue(`contacts.${selectedId}.phones`)}
            onItemsChange={(e) => {
              handleUpdate(e, 'phones');
            }}
            placeholder="Ajouter un numéro"
          />
        </Col>
      </Row>

      <Row className="mt-2">
        <Col xs="2" className="text-secondary">
          Adresse
        </Col>
        <Col>
          <input
            type="text"
            className="form-control"
            value={getValue(`contacts.${selectedId}.address`)}
            onChange={createEventHandlerMutator(
              `contacts.${selectedId}.address`
            )}
            placeholder="Adresse"
          />
        </Col>
      </Row>
    </>
  );

  const Relations = () => (
    <>
      <Row className="mt-2">
        <Col xs="2" className="text-secondary">
          Relations
        </Col>
        <Col>
          <ChipArray
            key={'relations-' + selectedId}
            initialItems={getValue(`contacts.${selectedId}.relations`)}
            onItemsChange={(e) => {
              handleUpdate(e, 'relations');
            }}
            placeholder="Ajouter une relation"
          />
        </Col>
      </Row>
    </>
  );
  const email = getValue(`contacts.${selectedId}.emails`)?.[0];

  return (
    <PerfectScrollbar className="contact-conten">
      <Link id="contactClose" to="#" className="contact-close">
        <i className="ri-close-fill"></i>
      </Link>
      <div className="d-sm-flex p-2 p-sm-4 p-md-2 p-xl-4">
        <div className="me-4 mb-3 mb-sm-0">
          <Avatar img={getValue(`contacts.${selectedId}.thumb`)} />
        </div>
        <div className="flex-fill">
          <input
            type="text"
            value={getValue(`contacts.${selectedId}.name`)}
            onChange={createEventHandlerMutator(`contacts.${selectedId}.name`)}
            placeholder="Nom"
            className="form-control mb-1"
          />
          <input
            type="text"
            value={getValue(`contacts.${selectedId}.jobtitle`)}
            onChange={createEventHandlerMutator(
              `contacts.${selectedId}.jobtitle`
            )}
            className="form-control mb-2"
            placeholder="Titre"
          />
          <div className="d-flex">
            {email && (
              <Button
                variant="primary"
                className="px-5"
                href={`mailto://${email}`}
              >
                Message
              </Button>
            )}
            <Button
              variant="danger"
              className="btn-icon ms-1"
              onClick={handleShowDeleteContact}
            >
              <i className="ri-delete-bin-2-line"></i>
            </Button>
          </div>
        </div>
      </div>

      {/* <hr /> */}

      <Row className="mt-2" style={{ marginLeft: '2.5rem' }}>
        <Tabs id="contact-tab" activeKey={key} onSelect={setKey}>
          <Tab eventKey="step1" title="Coordonnées" className="p-3">
            <Coordinates />
          </Tab>
          <Tab eventKey="step2" title="Relations" className="p-3">
            <Relations />
          </Tab>
          <Tab eventKey="step3" title="Disponibilités" className="p-3">
            <Form.Group className="mt-3">
              <Form.Control
                as="textarea"
                rows={8}
                placeholder="Entrez les dispos ici..."
                value={getValue(`contacts.${selectedId}.disponibilites`)}
                onChange={createEventHandlerMutator(
                  `contacts.${selectedId}.disponibilites`
                )}
              />
            </Form.Group>
          </Tab>
          <Tab eventKey="step4" title="Notes" className="p-3">
            <Form.Group className="mt-3">
              <Form.Control
                as="textarea"
                rows={8}
                placeholder="Entrez vos notes ici..."
                value={getValue(`contacts.${selectedId}.notes`)}
                onChange={createEventHandlerMutator(
                  `contacts.${selectedId}.notes`
                )}
              />
            </Form.Group>
          </Tab>
        </Tabs>
      </Row>
    </PerfectScrollbar>
  );
};

export default ContactForm;
