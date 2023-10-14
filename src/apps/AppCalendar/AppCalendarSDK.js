import { v4 as uuidv4 } from 'uuid';

export function AppCalendarSDK(_calendarList = [], _bstack) {
  _bstack?.store?.mutate(s => ({ ...s, calendarEvents: _calendarList }));

  function list() {
    return _bstack?.store?.getState(s => s?.calendarEvents ?? []);
  }

  function create() {
    const newEvent = {
      "id": uuidv4(),
      "backgroundColor": '#d9e8ff',
      "borderColor": '#0168fa',
      "events": []
    };
    _bstack?.store?.mutate(s => ({ ...s, calendarEvents: [...s?.calendarEvents ?? [], newEvent] }));
    return newEvent;
  }

  function update(updatedEvent) {
    if (!updatedEvent.id) {
      throw new Error("Event object must have an 'id' property.");
    }

    const list = _bstack?.store?.getState(s => s?.calendarEvents ?? []) ?? [];
    const index = list.findIndex(event => event.id === updatedEvent.id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updatedEvent };
      _bstack?.store?.mutate(s => ({ ...s, calendarEvents: list }));
    } else {
      throw new Error(`Event with ID ${updatedEvent.id} not found.`);
    }
  }

  function trash(eventToDelete) {
    if (!eventToDelete.id) {
      throw new Error("Event object must have an 'id' property.");
    }

    const list = _bstack?.store?.getState(s => s?.calendarEvents ?? []) ?? [];
    const index = list.findIndex(event => event.id === eventToDelete.id);
    if (index !== -1) {
      list.splice(index, 1);
      _bstack?.store?.mutate(s => ({ ...s, calendarEvents: list }));
    } else {
      throw new Error(`Event with ID ${eventToDelete.id} not found.`);
    }
  }

  return {
    list,
    create,
    update,
    trash
  };
}
