import moment from 'moment';
import { useEffect, useState } from 'react';
import { calendarEventsKeys } from './calendarEvents';
import { v4 as uuidv4 } from 'uuid';

export const defaultModel = {
  start: new Date(),
  end: new Date(),
  title: '',
};

const defaultEventOption = 'calendar';
const defaultEventType = 'Event';

export function useCalendar({ create, list, update }) {
  useEffect(() => {
    document.body.classList.add('app-calendar');
    return () => {
      document.body.classList.remove('app-calendar');
    };
  }, []);
  const [modalShow, setModalShow] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null); // To keep track of the event being edited

  // State for form fields in the modal
  const [eventTitle, setEventTitle] = useState('');
  const [eventOption, setEventOption] = useState(defaultEventOption);
  const [eventType, setEventType] = useState(defaultEventType);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [eventDescription, setEventDescription] = useState('');

  const resetModalFields = () => {
    setEventTitle('');
    setEventType('Event');
    setStartDate(new Date());
    setEndDate(new Date());
    setEventDescription('');
    setEventOption(defaultEventOption);
  };

  // HANDLER

  const handleModalClose = () => {
    setModalShow(false);
    setEditingEvent(null);
    resetModalFields();
  };

  const handleModalShowWithEvent = event => {
    setEventTitle(event.title);
    setEditingEvent(event);
    setModalShow(true);
  };

  const handleSaveEvent = () => {
    const event = {
      ...defaultModel,
      title: eventTitle,
      start: moment(startDate).format('YYYY-MM-DD'),
      end: moment(endDate).format('YYYY-MM-DD'),
    };

    // update
    if (editingEvent) {
      console.log(editingEvent)
      // update({ ...editingEvent, ...event });
    // create
    } else {
      const model = { ...event, id: uuidv4() };
      const idx = calendarEventsKeys.indexOf(eventOption);

      const newList = { ...list() };
      newList[idx].events.push(model);
      update(newList[idx]);
    }

    handleModalClose();
  };

  const handleEventClick = info => {
    handleModalShowWithEvent(info.event);
  };

  const handleModalShow = () => setModalShow(true);

  const handleEventOption = e => setEventOption(e.target.value);

  const handleStartDate = setStartDate;

  const handleEndDate = setEndDate;

  const handleEventTitle = setEventTitle;

  const handleEventType = setEventType;

  const handleEventDescription = setEventDescription;

  return {
    editingEvent,
    endDate,
    eventDescription,
    eventOption,
    eventTitle,
    eventType,
    modalShow,
    startDate,
    handleEndDate,
    handleEventClick,
    handleEventDescription,
    handleEventOption,
    handleEventTitle,
    handleEventType,
    handleModalClose,
    handleModalShow,
    handleSaveEvent,
    handleStartDate,
  };
}
