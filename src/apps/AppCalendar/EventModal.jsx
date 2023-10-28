import React from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import { fr } from 'date-fns/locale';
import { getValue, createEventHandlerMutator, createEventHandlerMutatorShallow } from '../../App';
import 'react-datepicker/dist/react-datepicker.css';

function EventModal(props) {
    const {
        modalShow,
        handleModalClose,
        selectedItemId
    } = props;

    return (
        <Modal
            className='modal-event'
            show={modalShow}
            onHide={handleModalClose}
            centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {getValue(`calendarEvents.${selectedItemId}.title`)}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className='mb-3'>
                    <Form.Label>Titre de l'événement:</Form.Label>
                    <Form.Control
                        type='text'
                        value={getValue(`calendarEvents.${selectedItemId}.title`)}
                        onChange={createEventHandlerMutator(`calendarEvents.${selectedItemId}.title`)}
                        placeholder="Entrez le titre de l'événement"
                    />
                </div>

                <div className='mb-3'>
                    <Form.Check
                        type='radio'
                        name='etype'
                        inline
                        label='Événement'
                        value="Event"
                        checked={getValue(`calendarEvents.${selectedItemId}.type`) === 'Event'}
                        onChange={createEventHandlerMutator(`calendarEvents.${selectedItemId}.type`)}
                    />
                    <Form.Check
                        type='radio'
                        name='etype'
                        inline
                        label='Rappel'
                        value="Reminder"
                        checked={getValue(`calendarEvents.${selectedItemId}.type`) === 'Reminder'}
                        onChange={createEventHandlerMutator(`calendarEvents.${selectedItemId}.type`)}
                    />
                </div>

                <div className='mb-3'>
                    <Form.Group>
                        <Form.Label>Service:</Form.Label>
                        <Form.Select
                            value={getValue(`calendarEvents.${selectedItemId}.service`)}
                            onChange={createEventHandlerMutator(`calendarEvents.${selectedItemId}.service`)}>
                            <option value='Visite supervisée'>Visite supervisée</option>
                            <option value='Appel supervisée'>Appel supervisée</option>
                            <option value='Échange de garde'>Échange de garde</option>
                            <option value='other'>Autre</option>
                        </Form.Select>
                    </Form.Group>
                </div>
                <Row className='mb-3'>
                    <Col>
                        <Form.Label>Début:</Form.Label>
                        <ReactDatePicker
                            showTimeSelect
                            selected={new Date(getValue(`calendarEvents.${selectedItemId}.start`))}
                            onChange={createEventHandlerMutatorShallow(`calendarEvents.${selectedItemId}.start`)}
                            dateFormat="Pp"
                            locale={fr} 
                        />
                    </Col>

                    <Col>
                        <Form.Label>Fin:</Form.Label>
                        <ReactDatePicker
                            showTimeSelect
                            selected={new Date(getValue(`calendarEvents.${selectedItemId}.end`))}
                            onChange={createEventHandlerMutatorShallow(`calendarEvents.${selectedItemId}.end`)}
                            dateFormat="Pp"
                            locale={fr} 
                        />
                    </Col>
                </Row>

                <div>
                    <Form.Label>Description</Form.Label>

                    <Form.Control
                        as='textarea'
                        rows='3'
                        value={getValue(`calendarEvents.${selectedItemId}.description`)}
                        onChange={createEventHandlerMutator(`calendarEvents.${selectedItemId}.description`)}
                        placeholder='Écrire une description (facultatif)'
                    />
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant='' className='btn-white' onClick={handleModalClose}>
                    Fermer
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EventModal;
