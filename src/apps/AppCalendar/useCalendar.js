import { useEffect, useState } from 'react';

export const defaultModel = {
  backgroundColor: '#d9e8ff',
  borderColor: '#0168fa',
  events: [],
};

const defaultEventOption = 'calendar';
const defaultEventType = 'Event';

export function useCalendar({ create, update, logger }) {
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
      title: eventTitle,
      // ... other event attributes
    };
    if (editingEvent) {
      update({ ...editingEvent, ...event });
    } else {
      create(event);
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
