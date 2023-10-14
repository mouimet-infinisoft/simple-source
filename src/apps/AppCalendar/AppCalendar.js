// import React, {useEffect, useMemo, useState} from "react";
// import {Link} from "react-router-dom";
// import Header from "../../layouts/Header";
// import PerfectScrollbar from "react-perfect-scrollbar";
// import {
//     Button,
//     Col,
//     Form,
//     Modal,
//     Nav,
//     Row
// } from "react-bootstrap";
// import ReactDatePicker from "react-datepicker";
// import Avatar from "../../components/Avatar";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from '@fullcalendar/timegrid'
// import frLocale from '@fullcalendar/core/locales/fr';

// import {
//     // calendarEvents,
//     // birthdayEvents,
//     // holidayEvents,
//     // discoveredEvents,
//     // meetupEvents,
//     // otherEvents,
//     calenderEventsList
// } from "./CalendarEvents";

// import img6 from "../../assets/img/img6.jpg";
// import img8 from "../../assets/img/img8.jpg";
// import img10 from "../../assets/img/img10.jpg";
// import img12 from "../../assets/img/img12.jpg";
// import img14 from "../../assets/img/img14.jpg";
// import img15 from "../../assets/img/img15.jpg";
// import { core, useBrainStack } from "../../App";
// import { AppCalendarSDK } from "./AppCalendarSDK";

// function AppCalendarBase({calendarList, create, update, trash, logger }) {

//     useEffect(() => {
//         document.body.classList.add('app-calendar');
//         return() => {
//             document.body.classList.remove('app-calendar');
//         }
//     }, []);

//     const [startDate, setStartDate] = useState(new Date());

//     // toggle sidebar calendar
//     const [isSidebarShow, setSidebarShow] = useState(false);

//     // Modal
//     const [modalShow, setModalShow] = useState(false);
//     const handleModalClose = () => setModalShow(false);
//     const handleModalShow = () => setModalShow(true);

//     return (
//         <React.Fragment>
//             <Header/>
//             <div className={
//                 "main main-calendar" + (
//                 isSidebarShow ? " show" : ""
//             )
//             }>
//                 <div className="calendar-sidebar">
//                     <PerfectScrollbar className="sidebar-body">
//                         <div className="d-grid mb-3">
//                             <Button variant="primary"
//                                 onClick={handleModalShow}>Créer un nouvel événement</Button>
//                         </div>

//                         <ReactDatePicker selected={startDate}
//                             onChange={
//                                 (date) => setStartDate(date)
//                             }
//                             inline/>

//                         <div className="mb-5"></div>

//                         <h5 className="section-title section-title-sm mb-4">Événements à venir</h5>

//                         <ul className="event-group mb-5">
//                             {
//                             [
//                                 {
//                                     "title": "Réunion de concept de projet",
//                                     "schedule": "08:30 - 11:30",
//                                     "mutual": {
//                                         "avatar": [
//                                             img15, img14
//                                         ],
//                                         "user": "Lea",
//                                         "count": 4
//                                     }
//                                 }, {
//                                     "title": "Réunion générale de l'entreprise",
//                                     "schedule": "16:30 - 17:00",
//                                     "mutual": {
//                                         "avatar": [
//                                             img10, img8, img6
//                                         ],
//                                         "user": "Socrate",
//                                         "count": 8
//                                     }
//                                 }, {
//                                     "title": "Présentation du produit",
//                                     "schedule": "Demain, 09:30 - 10:30",
//                                     "mutual": {
//                                         "avatar": [
//                                             img15, img14, img12
//                                         ],
//                                         "user": "Marie",
//                                         "count": 5
//                                     }
//                                 }
//                             ].map((event, index) => (
//                                 <li className="event-item"
//                                     key={index}>
//                                     <div className="event-body">
//                                         <h6>
//                                             <Link to="">
//                                                 {
//                                                 event.title
//                                             }</Link>
//                                         </h6>
//                                         <p>{
//                                             event.schedule
//                                         }</p>
//                                         <div className="mutual-badge">
//                                             <ul> {
//                                                 event.mutual.avatar.map((avatar, ind) => (
//                                                     <li key={ind}><Avatar img={avatar}/></li>
//                                                 ))
//                                             } </ul>
//                                             <label>{
//                                                 event.mutual.user
//                                             }
//                                                 et {
//                                                 event.mutual.count
//                                             }
//                                                 autres participent</label>
//                                         </div>
//                                     </div>
//                                 </li>
//                             ))
//                         } </ul>

//                         <h5 className="section-title section-title-sm mb-4">Mon Calendrier</h5>
//                         <Nav className="nav-calendar mb-4">
//                             <Nav.Link href="" className="calendar">
//                                 <span></span>
//                                 Événements du calendrier</Nav.Link>
//                             <Nav.Link href="" className="birthday">
//                                 <span></span>
//                                 Événements d'anniversaire</Nav.Link>
//                             <Nav.Link href="" className="holiday">
//                                 <span></span>
//                                 Calendrier des jours fériés</Nav.Link>
//                             <Nav.Link href="" className="discover">
//                                 <span></span>
//                                 Événements découverts</Nav.Link>
//                             <Nav.Link href="" className="meetup">
//                                 <span></span>
//                                 Événements Meetup</Nav.Link>
//                             <Nav.Link href="" className="other">
//                                 <span></span>
//                                 Autres événements</Nav.Link>
//                         </Nav>

//                     </PerfectScrollbar>
//                 </div>
//                 <div className="calendar-body">
//                     <FullCalendar plugins={
//                             [dayGridPlugin, timeGridPlugin]
//                         }
//                         initialView="dayGridMonth"
//                         headerToolbar={
//                             {
//                                 "left": "custom1 prev,next today",
//                                 "center": "title",
//                                 "right": "dayGridMonth,timeGridWeek,timeGridDay"
//                             }
//                         }
//                         locales={
//                             [frLocale]
//                         }
//                         locale={'fr'}
//                         eventSources={
//                             calendarList
//                             // [
//                             //     calendarEvents,
//                             //     birthdayEvents,
//                             //     holidayEvents,
//                             //     discoveredEvents,
//                             //     meetupEvents,
//                             //     otherEvents
//                             // ]
//                         }
//                         // customButtons={
//                         //     {
//                         //         custom1: {
//                         //             icon: "chevron-left",
//                         //             click: function () {
//                         //                 setSidebarShow(!isSidebarShow);
//                         //             }
//                         //         }
//                         //     }
//                         // }
//                     />

//                     <Modal className="modal-event"
//                         show={modalShow}
//                         onHide={handleModalClose}
//                         centered>
//                         <Modal.Header closeButton>
//                             <Modal.Title>Créer un nouvel événement</Modal.Title>
//                         </Modal.Header>
//                         <Modal.Body>
//                             <div className="mb-3">
//                                 <Form.Label>Titre de l'événement:</Form.Label>
//                                 <Form.Control type="text" placeholder="Entrez le titre de l'événement"/>
//                             </div>
//                             <div className="mb-3">
//                                 <Form.Check type="radio" name="etype" inline label="Événement" checked/>
//                                 <Form.Check type="radio" name="etype" inline label="Rappel"/>
//                             </div>
//                             <Row className="g-3 mb-3">
//                                 <Col xs="7" md="8">
//                                     <Form.Label>Date de début:</Form.Label>
//                                     <Form.Control type="text" placeholder="Choisir une date"/>
//                                 </Col>
//                                 <Col>
//                                     <Form.Label>Heure de début:</Form.Label>
//                                     <Form.Select>
//                                         <option value="">Choisir une heure</option>
//                                         <option value="12:00">00:00</option>
//                                         <option value="12:15">00:15</option>
//                                         <option value="12:30">00:30</option>
//                                         <option value="12:45">00:45</option>
//                                     </Form.Select>
//                                 </Col>
//                             </Row>

//                             <Row className="g-3 mb-3">
//                                 <Col xs="7" md="8">
//                                     <Form.Label>Date de fin:</Form.Label>
//                                     <Form.Control type="text" placeholder="Choisir une date"/>
//                                 </Col>
//                                 <Col>
//                                     <Form.Label>Heure de fin:</Form.Label>
//                                     <Form.Select>
//                                         <option value="">Choisir une heure</option>
//                                         <option value="12:00">00:00</option>
//                                         <option value="12:15">00:15</option>
//                                         <option value="12:30">00:30</option>
//                                         <option value="12:45">00:45</option>
//                                     </Form.Select>
//                                 </Col>
//                             </Row>
//                             <div>
//                                 <Form.Label>Description</Form.Label>
//                                 <Form.Control as="textarea" rows="3" placeholder="Écrire une description (facultatif)"/>
//                             </div>
//                         </Modal.Body>
//                         <Modal.Footer>
//                             <Button variant="" className="btn-white"
//                                 onClick={handleModalClose}>
//                                 Fermer
//                             </Button>
//                             <Button variant="primary"
//                                 onClick={handleModalClose}>
//                                 Ajouter l'événement
//                             </Button>
//                         </Modal.Footer>
//                     </Modal>
//                 </div>
//             </div>
//         </React.Fragment>
//     );
// }


// export default function AppCalendar() {
//     const bstack = useBrainStack()
//     const calendarSdk = useMemo(() => AppCalendarSDK(calenderEventsList, core), [])
  
//     return <AppCalendarBase calendarList={calendarSdk.list()} create={calendarSdk.create} update={calendarSdk.update} trash={calendarSdk.trash} logger={bstack.log} />
// }

















import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "../../layouts/Header";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Button, Col, Form, Modal, Nav, Row } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';
import { core, useBrainStack } from "../../App";
import { AppCalendarSDK } from "./AppCalendarSDK";
import {
    // calendarEvents,
    // birthdayEvents,
    // holidayEvents,
    // discoveredEvents,
    // meetupEvents,
    // otherEvents,
    calenderEventsList
} from "./CalendarEvents";

function AppCalendarBase({ calendarList, create, update, trash, logger }) {

    useEffect(() => {
        document.body.classList.add('app-calendar');
        return () => {
            document.body.classList.remove('app-calendar');
        };
    }, []);

    const [isSidebarShow, setSidebarShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null); // To keep track of the event being edited

    // State for form fields in the modal
    const [eventTitle, setEventTitle] = useState("");
    const [eventType, setEventType] = useState("Event");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [eventDescription, setEventDescription] = useState("");

    const handleModalClose = () => {
        setModalShow(false);
        setEditingEvent(null);
        // Reset form fields
        setEventTitle("");
        setEventType("Event");
        setStartDate(new Date());
        setEndDate(new Date());
        setEventDescription("");
    };

    const handleModalShowWithEvent = (event) => {
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

    const handleEventClick = (info) => {
        handleModalShowWithEvent(info.event);
    };

    return (
        <React.Fragment>
            <Header />
            <div className={
                "main main-calendar" + (
                    isSidebarShow ? " show" : ""
                )
            }>
                <div className="calendar-sidebar">
                    <PerfectScrollbar className="sidebar-body">
                        <div className="d-grid mb-3">
                            <Button variant="primary"
                                onClick={() => setModalShow(true)}>Créer un nouvel événement</Button>
                        </div>
                        <ReactDatePicker selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            inline />
                        <div className="mb-5"></div>
                        <h5 className="section-title section-title-sm mb-4">Événements à venir</h5>
                        <ul className="event-group mb-5">
                            {/* ... existing sidebar JSX ... */}
                        </ul>
                    </PerfectScrollbar>
                </div>
                <div className="calendar-body">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            "left": "custom1 prev,next today",
                            "center": "title",
                            "right": "dayGridMonth,timeGridWeek,timeGridDay"
                        }}
                        locales={[frLocale]}
                        locale={'fr'}
                        eventSources={calendarList}
                        eventClick={handleEventClick}
                    />

                    <Modal className="modal-event"
                        show={modalShow}
                        onHide={handleModalClose}
                        centered>
                        <Modal.Header closeButton>
                            <Modal.Title>{editingEvent ? "Edit Event" : "Create New Event"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="mb-3">
                                <Form.Label>Titre de l'événement:</Form.Label>
                                <Form.Control type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} placeholder="Entrez le titre de l'événement" />
                            </div>
                            <div className="mb-3">
                                <Form.Check type="radio" name="etype" inline label="Événement" checked={eventType === "Event"} onChange={() => setEventType("Event")} />
                                <Form.Check type="radio" name="etype" inline label="Rappel" checked={eventType === "Reminder"} onChange={() => setEventType("Reminder")} />
                            </div>
                            <Row className="g-3 mb-3">
                                <Col xs="7" md="8">
                                    <Form.Label>Date de début:</Form.Label>
                                    <ReactDatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                                </Col>
                                <Col>
                                    <Form.Label>Date de fin:</Form.Label>
                                    <ReactDatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                                </Col>
                            </Row>
                            <div>
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows="3" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} placeholder="Écrire une description (facultatif)" />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="" className="btn-white" onClick={handleModalClose}>
                                Fermer
                            </Button>
                            <Button variant="primary" onClick={handleSaveEvent}>
                                {editingEvent ? "Update Event" : "Add Event"}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </React.Fragment>
    );
}

export default function AppCalendar() {
    const bstack = useBrainStack();
    const calendarSdk = useMemo(() => AppCalendarSDK(calenderEventsList, core), []);

    return <AppCalendarBase calendarList={calendarSdk.list()} create={calendarSdk.create} update={calendarSdk.update} trash={calendarSdk.trash} logger={bstack.log} />
}
