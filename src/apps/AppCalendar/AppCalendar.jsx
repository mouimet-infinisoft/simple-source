import React, { useState, useRef, useEffect } from 'react';
import Header from '../../layouts/Header';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Button } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';
import interactionPlugin from '@fullcalendar/interaction'
import { useBrainStack } from '../../App';
import EventModal from './EventModal';
import { fr } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";

export function CalendarComponent() {
  const bstack = useBrainStack()
  const { update, create, list } = bstack.store.createCRUDObject('calendarEvents')
  const [activeDate, setActiveDate] = useState(new Date())
  const [selectedItemId, setSelectedItemId] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  const calendarRef = useRef(null);

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(activeDate);
    }
  }, [activeDate]);

  const handleEventClick = info => {
    setSelectedItemId(info?.event?.id)
    setModalShow(true);
  };

  const handleCreateEventClick = () => {
    const e = create({ start: new Date(), end: new Date() })
    console.log(e)
    setSelectedItemId(e?.id)
    setModalShow(true);
  };

  const handleModalClose = () => setModalShow(false);

  return (
    <React.Fragment>
      <div className='calendar-sidebar'>
        <PerfectScrollbar className='sidebar-body'>
          <div className='d-grid mb-3'>
            <Button variant='primary' onClick={handleCreateEventClick}>
              Créer un événement
            </Button>
          </div>
          <ReactDatePicker
            selected={activeDate}
            onChange={setActiveDate}
            locale={fr}
            inline
          />
          <div className='mb-5'></div>
        </PerfectScrollbar>
      </div>

      <div className='calendar-body'>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          editable={true}
          eventDrop={(info) => {
            update({ id: info.event.id, start: info.event.start, end: info.event.end })
          }}
          initialView='dayGridMonth'
          headerToolbar={{
            left: 'custom1 prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          locales={[frLocale]}
          locale={'fr'}
          events={Object.values(list())}
          eventClick={handleEventClick}
        />
      </div>

      <EventModal modalShow={modalShow}
        handleModalClose={handleModalClose}
        selectedItemId={selectedItemId}
      />
    </React.Fragment>
  );
}

export default function AppCalendar() {
 
  return (
    <React.Fragment>
      <Header />

      <div className='main main-calendar'>
       <CalendarComponent />
      </div>
    </React.Fragment>
  );
}
