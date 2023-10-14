import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Nav, Row } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import ChipArray from "../../components/ChipArray";
import ConfirmModal from "../../components/ConfirmModal";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import Avatar from "../../components/Avatar";
import { useBrainStack } from "../../App";
import { crudSDK } from "../../modules/crudSDK";

import img11 from "../../assets/img/img11.jpg";
import { contactList } from "./contactList";

function ContactsBase({ contacts, create, update, trash, logger }) {
  useEffect(() => {
    document.body.classList.add('page-app')
    return () => {
      document.body.classList.remove('page-app')
    }
  }, []);

  // toggle contact sidebar in mobile
  const [isSidebarShow, setSidebarShow] = useState(false);

  const sidebarShow = () => {
    setSidebarShow(!isSidebarShow);
  };

  const [activeContact, setActiveContact] = useState(contacts?.[0] ?? {});

  function handleClickContact(_context) {
    setActiveContact(_context)
    logger.info("Clicked: ", _context);
  }

  function handleClickCreate() {
    setActiveContact(create())
    logger.info("Created: ", activeContact);
  }

  function handleUpdate(val, field) {
    setActiveContact(s => {
      const newState = { ...s, [field]: val }
      update(newState)
      return newState
    })
    logger.info("Updated: ", activeContact);
  }

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  function handleDeleteContact() {
    logger.info("Delete: ", activeContact);
    trash(activeContact)
    setActiveContact(contacts?.[0] ?? {})
    handleHideDeleteContact()
  }
  function handleShowDeleteContact() {
    setShowDeleteConfirm(true)
  }
  function handleHideDeleteContact() {
    setShowDeleteConfirm(false)
  }

  return (
    <React.Fragment>
      <Header />
      <ConfirmModal
        show={showDeleteConfirm}
        onHide={handleHideDeleteContact}
        title={activeContact?.name}
        onCancel={handleHideDeleteContact}
        onConfirm={handleDeleteContact}
      />


      <div className="main main-app p-3 p-lg-4">
        <div className={"contact-panel " + (isSidebarShow ? "sidebar-show" : "")}>
          <PerfectScrollbar className="contact-sidebar">
            <div className="mb-4">
              <Button variant="primary" className="btn-contact-new" onClick={handleClickCreate}>
                <i className="ri-add-fill"></i> Ajouter
              </Button>
            </div>

            <Nav className="nav-sidebar">
              <Nav.Link href="" className="active"><i className="ri-contacts-fill"></i>Tous les contacts <small>{contacts?.length ?? ""}</small></Nav.Link>
              <Nav.Link href=""><i className="ri-delete-bin-line"></i> Corbeille</Nav.Link>
            </Nav>

          </PerfectScrollbar>

          <div className="contact-body">
            <div className="contact-list">
              <div className="contact-list-header">
                <Link onClick={sidebarShow} href="#" className="contact-menu d-xl-none"><i className="ri-arrow-left-line"></i></Link>
                <h6 className="sidebar-title me-auto">Tous les contacts</h6>
              </div>

              <PerfectScrollbar className="contact-list-body">
                <div className="contact-group mb-3">
                  {contacts?.map((item, ind) => (
                    <div key={ind} className={(item?.id === activeContact?.id && item?.id) ? "contact-item selected" : "contact-item"} onClickCapture={() => { handleClickContact(item) }}>
                      <div className={"avatar " + item.status}>
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
              <Link id="contactClose" href="" className="contact-close"><i className="ri-close-fill"></i></Link>
              <div className="d-sm-flex p-2 p-sm-4 p-md-2 p-xl-4">
                <div className="me-4 mb-3 mb-sm-0"><Avatar img={activeContact.thumb} /></div>
                <div className="flex-fill">
                  <input type="text" value={activeContact.name} onChange={e => { handleUpdate(e.currentTarget.value, "name") }} placeholder="Nom" className="form-control mb-1" />
                  <input type="text" value={activeContact.jobtitle} className="form-control mb-2" onChange={e => { handleUpdate(e.currentTarget.value, "jobtitle") }} placeholder="Titre" />
                  <div className="d-flex">
                    <Button variant="primary" className="px-5">Message</Button>
                    {/* <Button variant="" className="btn-icon btn-gray ms-1"><i className="ri-star-line"></i></Button> */}
                    <Button variant="danger" className="btn-icon ms-1" onClick={handleShowDeleteContact}><i className="ri-delete-bin-2-line"></i></Button>
                  </div>
                </div>
              </div>

              <hr />

              <Row className="mt-2">
                <Col xs="4" className="text-end text-secondary">Courriels</Col>
                <Col>
                  <ChipArray key={"active-emails-" + activeContact?.id} initialItems={activeContact.emails} onItemsChange={e => { handleUpdate(e, "emails") }} placeholder="Ajouter un courriel" />
                </Col>
              </Row>


              <Row className="mt-2">
                <Col xs="4" className="text-end text-secondary">Téléphones</Col>
                <Col>
                  <ChipArray key={"active-phones-" + activeContact?.id} initialItems={activeContact.phones} onItemsChange={e => { handleUpdate(e, "phones") }} placeholder="Ajouter un numéro" />
                </Col>
              </Row>

              <Row className="mt-2">
                <Col xs="4" className="text-end text-secondary">Adresse</Col>
                <Col>
                  <input type="text" value={activeContact?.address ?? ""} className="form-control" onChange={e => { handleUpdate(e.currentTarget.value, "address") }} placeholder="Adresse" />
                </Col>
              </Row>
            </PerfectScrollbar>
          </div>
        </div>

        <Footer />
      </div>
    </React.Fragment>

  );
}

export default function Contacts() {
  const bstack = useBrainStack()
  const contactSdk = useMemo(() => 
  crudSDK('contacts', 
    {
      "status": "",
      "thumb": img11,
      "name": "",
      "contact": "",
      "phones": [],
      "address": "",
      "jobtitle": "",
      "emails": [],
    })(contactList), []);

  return <ContactsBase contacts={contactSdk.list()} create={contactSdk.create} update={contactSdk.update} trash={contactSdk.trash} logger={bstack.log} />
}
