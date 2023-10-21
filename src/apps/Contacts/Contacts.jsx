import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {  getValue, useBrainStack } from '../../App';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import ConfirmModal from '../../components/atoms/ConfirmModal';
import ListSideBar from '../../components/atoms/ListComponent';
import img11 from '../../assets/img/img11.jpg'
import ContactForm from './ContactForm';

export const defaultModelContact = {
  status: '',
  thumb: img11,
  name: '',
  contact: '',
  phones: [],
  address: '',
  jobtitle: '',
  emails: [],
};

const Contacts = () => {
  const bstack = useBrainStack();
  const { list, search, create, update, delete: trash } = bstack.store.createCRUDObject('contacts')
  const [selectedId, setSelectedId] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isSidebarShow, setSidebarShow] = useState(false);
  function toggleSidebarShow() {
    setSidebarShow(!isSidebarShow);
  }

  function handleUpdate(val, field) {
    const _contact = getValue(`contacts.${selectedId}`)
    _contact[field] = val
    _contact.contact = [..._contact.phones, ..._contact.emails][0];
    update(_contact);
    bstack.log.info('Updated: ', _contact);
  };

  function handleHideDeleteContact() {
    setShowDeleteConfirm(false);
  }

  function handleDeleteContact() {
    trash(getValue(`contacts.${selectedId}`));
    setSelectedId(null)
    handleHideDeleteContact();
  }

  function handleShowDeleteContact() {
    setShowDeleteConfirm(true);
  }

  return (
    <React.Fragment>
      <Header />
      <ConfirmModal
        show={showDeleteConfirm}
        onHide={handleHideDeleteContact}
        title={getValue(`contacts.${selectedId}.name`)}
        onCancel={handleHideDeleteContact}
        onConfirm={handleDeleteContact}
      />

      <div className="main main-app p-3 p-lg-4">
        <div
          className={'contact-panel ' + (isSidebarShow ? 'sidebar-show' : '')}
        >
          <ListSideBar
            buttonAddLabel="Ajouter"
            basketLabel="Corbeille"
            totalLabel="Tous les contacts"
            totalAmount={Object.values(list())?.length ?? ''}
            iconTotal="ri-contacts-fill"
            onClickCreate={() => {
              setSelectedId(create(defaultModelContact)?.id)
            }}
          />

          <div className="contact-body">
            <div className="contact-list">
              <div className="contact-list-header">
                <Link
                  onClick={toggleSidebarShow}
                  href="#"
                  className="contact-menu d-xl-none"
                >
                  <i className="ri-arrow-left-line"></i>
                </Link>
                <h6 className="sidebar-title me-auto">Tous les contacts</h6>
              </div>

              <PerfectScrollbar className="contact-list-body">
                <div className="contact-group mb-3">
                  {Object.values(search(getValue('search')))?.map((item) => (
                    <div
                      key={item.id}
                      className={
                        item?.id === selectedId && item?.id
                          ? 'contact-item selected'
                          : 'contact-item'
                      }
                      onClickCapture={() => {
                        setSelectedId(item?.id)
                      }}
                    >
                      <div className={'avatar ' + item.status}>
                        {item.thumb && <img src={item.thumb} alt="" />}
                      </div>
                      <div className="contact-item-body">
                        <div className="d-flex align-items-center mb-1">
                          <h6 className="mb-0">{item.name}</h6>
                        </div>
                        <span>{item.contact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </PerfectScrollbar>
            </div>

            <div className='contact-content'>
              <ContactForm selectedId={selectedId} handleUpdate={handleUpdate} handleShowDeleteContact={handleShowDeleteContact} />
            </div>

          </div>
        </div>

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Contacts;
