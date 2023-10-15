import { useEffect, useState } from 'react';
import img11 from '../../assets/img/img11.jpg';

export const defaultModel = {
  status: '',
  thumb: img11,
  name: '',
  contact: '',
  phones: [],
  address: '',
  jobtitle: '',
  emails: [],
};

export function useContacts({ contacts, create, update, trash, logger }) {
  // hooks
  useEffect(() => {
    document.body.classList.add('page-app');
    return () => {
      document.body.classList.remove('page-app');
    };
  }, []);

  const [isSidebarShow, setSidebarShow] = useState(false);
  const [activeContact, setActiveContact] = useState(contacts?.[0] ?? {});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // func

  function toggleSidebarShow() {
    setSidebarShow(!isSidebarShow);
  }

  function handleClickContact(_context) {
    setActiveContact(_context);
    logger.info('Clicked: ', _context);
  }

  function handleClickCreate() {
    setActiveContact(create({ ...defaultModel }));
    logger.info('Created: ', activeContact);
  }

  function handleUpdate(val, field) {
    setActiveContact(s => {
      const newState = { ...s, [field]: val };
      newState.contact = [...newState.phones, ...newState.emails][0];
      update(newState);
      return newState;
    });
    logger.info('Updated: ', activeContact);
  }

  function handleHideDeleteContact() {
    setShowDeleteConfirm(false);
  }

  function handleDeleteContact() {
    logger.info('Delete: ', activeContact);
    trash(activeContact);
    setActiveContact(contacts?.[0] ?? {});
    handleHideDeleteContact();
  }

  function handleShowDeleteContact() {
    setShowDeleteConfirm(true);
  }

  return {
    defaultModel,
    isSidebarShow,
    activeContact,
    showDeleteConfirm,
    handleClickContact,
    handleClickCreate,
    handleDeleteContact,
    handleHideDeleteContact,
    handleShowDeleteContact,
    handleUpdate,
    toggleSidebarShow,
  };
}
