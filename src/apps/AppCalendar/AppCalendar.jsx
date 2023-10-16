import React, { useMemo } from 'react';
import Header from '../../layouts/Header';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';
import {
  // calendarEvents,
  // birthdayEvents,
  // holidayEvents,
  // discoveredEvents,
  // meetupEvents,
  // otherEvents,
  calendarEventsList,
} from './calendarEvents';
import { useCalendar, defaultModel } from './useCalendar';
import { crudSDK } from '../../modules/crudSDK';

export default function AppCalendar() {
  const { list, create, update, trash } = useMemo(
    () => crudSDK('calendarEvents', { ...defaultModel })(calendarEventsList),
    []
  );

  const calendarList = list();

  const {
    modalShow,
    eventType,
    startDate,
    endDate,
    eventDescription,
    eventOption,
    editingEvent,
    eventTitle,
    handleSaveEvent,
    handleEventClick,
    handleModalShow,
    handleStartDate,
    handleEndDate,
    handleModalClose,
    handleEventTitle,
    handleEventType,
    handleEventDescription,
    handleEventOption,
  } = useCalendar({ create, list, update });

  return (
    <React.Fragment>
      <Header />

      <div className='main main-calendar'>
        <div className='calendar-sidebar'>
          <PerfectScrollbar className='sidebar-body'>
            <div className='d-grid mb-3'>
              <Button variant='primary' onClick={handleModalShow}>
                Créer un nouvel événement
              </Button>
            </div>
            <ReactDatePicker
              selected={startDate}
              onChange={handleStartDate}
              inline
            />
            <div className='mb-5'></div>
            <h5 className='section-title section-title-sm mb-4'>
              Événements à venir
            </h5>
            <ul className='event-group mb-5'>
              {/* ... existing sidebar JSX ... */}
            </ul>
          </PerfectScrollbar>
        </div>

        <div className='calendar-body'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView='dayGridMonth'
            headerToolbar={{
              left: 'custom1 prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            locales={[frLocale]}
            locale={'fr'}
            eventSources={calendarList}
            eventClick={handleEventClick}
          />
        </div>

        <Modal
          className='modal-event'
          show={modalShow}
          onHide={handleModalClose}
          centered>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingEvent ? 'Edit Event' : 'Create New Event'}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className='mb-3'>
              <Form.Label>Titre de l'événement:</Form.Label>
              <Form.Control
                type='text'
                value={eventTitle}
                onChange={e => handleEventTitle(e.target.value)}
                placeholder="Entrez le titre de l'événement"
              />
            </div>

            <div className='mb-3'>
              <Form.Check
                type='radio'
                name='etype'
                inline
                label='Événement'
                checked={eventType === 'Event'}
                onChange={() => handleEventType('Event')}
              />
              <Form.Check
                type='radio'
                name='etype'
                inline
                label='Rapper'
                checked={eventType === 'Reminder'}
                onChange={() => handleEventType('Reminder')}
              />
            </div>

            <div className='mb-3'>
              <Form.Group>
                <Form.Label>Select event type:</Form.Label>
                <Form.Select value={eventOption} onChange={handleEventOption}>
                  <option value='calendar'>Calendrier</option>
                  <option value='birthday'>Anniversaire</option>
                  <option value='holiday'>Vacances</option>
                  <option value='discover'>Découvrir</option>
                  <option value='meetup'>Rencontre</option>
                  <option value='other'>Autre</option>
                </Form.Select>
              </Form.Group>
            </div>
            <Row className='g-3 mb-3'>
              <Col xs='7' md='8'>
                <Form.Label>Date de début:</Form.Label>
                <ReactDatePicker
                  selected={startDate}
                  onChange={handleStartDate}
                />
              </Col>

              <Col>
                <Form.Label>Date de fin:</Form.Label>
                <ReactDatePicker selected={endDate} onChange={handleEndDate} />
              </Col>
            </Row>

            <div>
              <Form.Label>Description</Form.Label>

              <Form.Control
                as='textarea'
                rows='3'
                value={eventDescription}
                onChange={e => handleEventDescription(e.target.value)}
                placeholder='Écrire une description (facultatif)'
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='' className='btn-white' onClick={handleModalClose}>
              Fermer
            </Button>

            <Button variant='primary' onClick={handleSaveEvent}>
              {editingEvent ? 'Update Event' : 'Add Event'}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </React.Fragment>
  );
}
