import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { createEventHandlerMutator, getValue, useBrainStack } from '../../App';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import ChipArray from '../../components/atoms/ChipArray';
import ConfirmModal from '../../components/atoms/ConfirmModal';
import Avatar from '../../components/atoms/Avatar';
import ListSideBar from '../../components/atoms/ListComponent';
import img11 from '../../assets/img/img11.jpg'

const defaultModel = {
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
              setSelectedId(create(defaultModel)?.id)
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

            <PerfectScrollbar className="contact-content">
              <Link id="contactClose" href="" className="contact-close">
                <i className="ri-close-fill"></i>
              </Link>
              <div className="d-sm-flex p-2 p-sm-4 p-md-2 p-xl-4">
                <div className="me-4 mb-3 mb-sm-0">
                  <Avatar img={getValue(`contacts.${selectedId}.thumb`)} />
                </div>
                <div className="flex-fill">
                  <input
                    type="text"
                    value={getValue(`contacts.${selectedId}.name`)}
                    onChange={createEventHandlerMutator(`contacts.${selectedId}.name`)}
                    placeholder="Nom"
                    className="form-control mb-1"
                  />
                  <input
                    type="text"
                    value={getValue(`contacts.${selectedId}.jobtitle`)}
                    onChange={createEventHandlerMutator(`contacts.${selectedId}.jobtitle`)}
                    className="form-control mb-2"
                    placeholder="Titre"
                  />
                  <div className="d-flex">
                    <Button variant="primary" className="px-5">
                      Message
                    </Button>
                    <Button
                      variant="danger"
                      className="btn-icon ms-1"
                      onClick={handleShowDeleteContact}
                    >
                      <i className="ri-delete-bin-2-line"></i>
                    </Button>
                  </div>
                </div>
              </div>

              <hr />

              <Row className="mt-2">
                <Col xs="4" className="text-end text-secondary">
                  Courriels
                </Col>
                <Col>
                  <ChipArray
                    key={'active-emails-' + selectedId}
                    initialItems={getValue(`contacts.${selectedId}.emails`)}
                    onItemsChange={(e) => {
                      handleUpdate(e, 'emails');
                    }}
                    placeholder="Ajouter un courriel"
                  />
                </Col>
              </Row>

              <Row className="mt-2">
                <Col xs="4" className="text-end text-secondary">
                  Téléphones
                </Col>
                <Col>
                  <ChipArray
                    key={'active-phones-' + selectedId}
                    initialItems={getValue(`contacts.${selectedId}.phones`)}
                    onItemsChange={(e) => {
                      handleUpdate(e, 'phones');
                    }}
                    placeholder="Ajouter un numéro"
                  />
                </Col>
              </Row>

              <Row className="mt-2">
                <Col xs="4" className="text-end text-secondary">
                  Adresse
                </Col>
                <Col>
                  <input
                    type="text"
                    className="form-control"
                    value={getValue(`contacts.${selectedId}.address`)}
                    onChange={createEventHandlerMutator(`contacts.${selectedId}.address`)}
                    placeholder="Adresse"
                  />
                </Col>
              </Row>
            </PerfectScrollbar>
          </div>
        </div>

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Contacts;
