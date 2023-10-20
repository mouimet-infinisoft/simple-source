import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link } from 'react-router-dom';
import Avatar from '../../components/atoms/Avatar';
import ChipArray from '../../components/atoms/ChipArray';
import { createEventHandlerMutator, getValue } from '../../App';

const ContactForm = ({ 
    selectedId, 
    handleShowDeleteContact, 
    handleUpdate 
}) => {
    return (
        <PerfectScrollbar className="contact-content">
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
                        onChange={createEventHandlerMutator(`contacts.${selectedId}.jobtitle`)}
                        className="form-control mb-2"
                        placeholder="Titre"
                    />
                    <div className="d-flex">
                        <Button variant="primary" className="px-5">
                            Message
                        </Button>
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

            <hr />

            <Row className="mt-2">
                <Col xs="4" className="text-end text-secondary">
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
                <Col xs="4" className="text-end text-secondary">
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
                <Col xs="4" className="text-end text-secondary">
                    Adresse
                </Col>
                <Col>
                    <input
                        type="text"
                        className="form-control"
                        value={getValue(`contacts.${selectedId}.address`)}
                        onChange={createEventHandlerMutator(`contacts.${selectedId}.address`)}
                        placeholder="Adresse"
                    />
                </Col>
            </Row>
        </PerfectScrollbar>
    );
};

export default ContactForm;
