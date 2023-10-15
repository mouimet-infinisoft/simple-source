import { useEffect, useState } from 'react';

export const defaultModel = {
  backgroundColor: '#d9e8ff',
  borderColor: '#0168fa',
  events: [],
};

export function useCalendar({ create, update }) {
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
  const [eventType, setEventType] = useState('Event');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [eventDescription, setEventDescription] = useState('');

  const handleModalClose = () => {
    setModalShow(false);
    setEditingEvent(null);
    // Reset form fields
    setEventTitle('');
    setEventType('Event');
    setStartDate(new Date());
    setEndDate(new Date());
    setEventDescription('');
  };

  const handleModalShowWithEvent = event => {
    setEventTitle(event.title);
    // Set other event attributes...
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

  const handleStartDate = setStartDate;

  const handleEndDate = setEndDate;

  const handleEventTitle = setEventTitle;

  const handleEventType = setEventType;

  const handleEventDescription = setEventDescription;

  return {
    editingEvent,
    endDate,
    eventDescription,
    eventTitle,
    eventType,
    modalShow,
    startDate,
    handleEndDate,
    handleEventClick,
    handleEventDescription,
    handleEventTitle,
    handleEventType,
    handleModalClose,
    handleModalShow,
    handleSaveEvent,
    handleStartDate,
  };
}
