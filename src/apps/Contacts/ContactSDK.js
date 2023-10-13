import { v4 as uuidv4 } from 'uuid';
import img11 from "../../assets/img/img11.jpg";

export function ContactSDK(_contactList = [], _bstack) {
  _bstack?.store?.mutate(s => ({ ...s, contacts: _contactList }));

  function list() {
    // return contactList   
    return _bstack?.store?.getState(s => s?.contacts ?? []);
  }

  // Create a new empty contact structure with a new UUID and return the object
  function create() {
    const newContact = {
      "id": uuidv4(),
      "status": "",
      "thumb": img11,
      "name": "",
      "contact": "",
      "phones": [],
      "address": "",
      "jobtitle": "",
      "emails": []
    };
    _bstack?.store?.mutate(s => ({ ...s, contacts: [...s?.contacts ?? [], newContact] }));
    return newContact;
  }

  // Update a contact using a contact object
  function update(updatedContact) {
    if (!updatedContact.id) {
      throw new Error("Contact object must have an 'id' property.");
    }

    const list = _bstack?.store?.getState(s => s?.contacts ?? []) ?? [];
    const index = list.findIndex(contact => contact.id === updatedContact.id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updatedContact };
      _bstack?.store?.mutate(s => ({ ...s, contacts: list }));
    } else {
      throw new Error(`Contact with ID ${updatedContact.id} not found.`);
    }
  }

  // Trash (delete) a contact using a contact object
  function trash(contactToDelete) {
    if (!contactToDelete.id) {
      throw new Error("Contact object must have an 'id' property.");
    }

    const list = _bstack?.store?.getState(s => s?.contacts ?? []) ?? [];
    const index = list.findIndex(contact => contact.id === contactToDelete.id);
    if (index !== -1) {
      list.splice(index, 1);
      _bstack?.store?.mutate(s => ({ ...s, contacts: list }));
    } else {
      throw new Error(`Contact with ID ${contactToDelete.id} not found.`);
    }
  }

  return {
    list,
    create,
    update,
    trash
  };
}
