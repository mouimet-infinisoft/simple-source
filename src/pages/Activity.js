import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Row, Form } from "react-bootstrap";
import Footer from "../layouts/Footer";
// import HeaderMobile from "../layouts/HeaderMobile";

import img1 from "../assets/img/img1.jpg";
import img2 from "../assets/img/img2.jpg";
import img3 from "../assets/img/img3.jpg";
import img6 from "../assets/img/img6.jpg";
import img16 from "../assets/img/img16.jpg";
import img17 from "../assets/img/img17.jpg";
import { ActivityList } from "./ActivityList";


const activities = [
  {
    "date": "Aujourd'hui, 13 Sep 2023",
    "items": [
      {
        "type": "demande",
        "avatar": "ri-question-answer-line",
        "author": "Vous",
        "action": "avez effectué une opération sur la référence D-000006.",
        "time": "18h55",
        "content": "Une opération a été effectuée sur la demande D-000006. Créée le 30 Août, 2023, cette demande concerne le service de Visite supervisée et est actuellement Terminée."
      },
      {
        "type": "demande",
        "avatar": "ri-question-answer-line",
        "author": "Collègue",
        "action": "a mis à jour la demande D-000002.",
        "time": "11h20",
        "content": "La demande D-000002, créée le 19 Août, 2023, pour le service d'Appel supervisée est actuellement En cours."
      }
    ]
  },
  {
    "date": "Hier, 12 Sep 2023",
    "items": [
      {
        "type": "demande",
        "avatar": "ri-question-answer-line",
        "author": "Collaborateur",
        "action": "a créé la demande D-000005.",
        "time": "10h15",
        "content": "Une nouvelle demande D-000005 a été créée le 22 Août, 2023. Elle concerne le service d'Appel supervisée et est actuellement En cours."
      },
      {
        "type": "demande",
        "avatar": "ri-question-answer-line",
        "author": "Vous",
        "action": "avez effectué une opération sur la demande D-000003.",
        "time": "09h19",
        "content": "La demande D-000003, créée le 20 Août, 2023, pour le service d'Échange de garde est actuellement Terminée."
      },
      {
        "type": "demande",
        "avatar": "ri-question-answer-line",
        "author": "Collègue",
        "action": "a mis à jour la demande D-000004.",
        "time": "09h08",
        "content": "La demande D-000004, créée le 21 Août, 2023, pour le service d'Échange de garde est actuellement En attente."
      }
    ]
  }
]

export default function Activity() {
  return (
    <React.Fragment>
      {/* <HeaderMobile /> */}
      <div className="main p-4 p-lg-5">
        <Row className="g-5">
          <Col xl="9">
            {/* <ol className="breadcrumb fs-sm mb-2">
              <li className="breadcrumb-item"><Link to="#">Pages</Link></li>
              <li className="breadcrumb-item"><Link to="#">User Pages</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Activity Log</li>
            </ol> */}
            {/* <h2 className="main-title mb-3">Registre</h2>

            <p className="text-secondary mb-5">Voici la liste des activités.</p> */}

            {/* <div className="form-search py-2 mb-4">
              <i className="ri-search-line"></i>
              <Form.Control type="text" placeholder="Recherche" />
            </div> */}

            {/* <div className="d-flex align-items-center justify-content-between mb-4">
              <h5 className="section-title mb-0">Modifications</h5>
              <Form.Check type="switch" label="Tout afficher" className="fs-sm" />
            </div> */}
            <ActivityList activities={activities} />
            {/* <ul className="activity-group mb-5">
              <li className="activity-date">Today, Sep 13, 2023</li>
              <li className="activity-item comment">
                <p className="d-sm-flex align-items-center mb-2">
                  <Link to="" className="avatar avatar-xs me-2 d-none d-sm-inline"><img src={img1} alt="" /></Link>
                  <span className="fs-sm"><strong>You</strong> mentioned <strong>Mellisa Ricks</strong> in a comment.</span>
                  <span className="text-secondary fs-xs ms-auto">06:55pm</span>
                </p>
                <Card className="card-comment">
                  <Card.Body>
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. <strong>@mellisaricks</strong>
                  </Card.Body>
                </Card>
              </li>
              <li className="activity-item post">
                <p className="d-sm-flex align-items-center mb-2">
                  <Link to="" className="avatar avatar-xs me-2 d-none d-sm-inline"><img src={img6} alt="" /></Link>
                  <span className="fs-sm"><strong>Rickey Carpenters</strong> shared your post <strong>#PDSG4064</strong></span>
                  <span className="fs-xs text-secondary ms-auto">11:20am</span>
                </p>
                <Card className="card-comment">
                  <Card.Body>
                    <Row className="g-1 mb-2">
                      <Col xs="2"><img src={img2} className="img-fluid" alt="" /></Col>
                      <Col xs="2"><img src={img3} className="img-fluid" alt="" /></Col>
                    </Row>
                    <span>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. <Link to="">Read more</Link></span>
                  </Card.Body>
                </Card>
              </li>
              <li className="activity-date">Yesterday, Sep 12, 2023</li>
              <li className="activity-item like">
                <p className="d-sm-flex align-items-center mb-0">
                  <Link to="" className="avatar avatar-xs me-2 d-none d-sm-inline"><img src={img16} alt="" /></Link>
                  <span className="fs-sm"><strong>Dianne Aceron</strong> reacted on your post <strong>#PDSG4064</strong></span>
                  <span className="fs-xs text-secondary ms-auto">10:15am</span>
                </p>
              </li>
              <li className="activity-item like">
                <p className="d-sm-flex align-items-center mb-0">
                  <Link to="" className="avatar avatar-xs me-2 d-none d-sm-inline"><img src={img17} alt="" /></Link>
                  <span className="fs-sm"><strong>Rolando Paloso</strong> reacted on your post <strong>#PDSG4064</strong></span>
                  <span className="fs-xs text-secondary ms-auto">09:19am</span>
                </p>
              </li>
              <li className="activity-item comment">
                <p className="d-sm-flex align-items-center mb-2">
                  <Link to="" className="avatar avatar-xs me-2 d-none d-sm-inline"><img src={img16} alt="" /></Link>
                  <span className="fs-sm"><strong>Socrates Itumay</strong> commented on your post <strong>#PST02522</strong></span>
                  <span className="text-secondary fs-xs ms-auto">09:08am</span>
                </p>
                <Card className="card-comment">
                  <Card.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </Card.Body>
                </Card>
              </li>
            </ul> */}
            {/* 
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h5 className="section-title mb-0">Recherche historique</h5>
              <Link to="">Recommencer</Link>
            </div>

            <ul className="activity-group mb-5">
              <li className="activity-date">Aug 30, 2023</li>
              <li className="activity-item search">
                <p className="d-sm-flex align-items-center mb-0">
                  <Link to="" className="avatar avatar-xs me-2 d-none d-sm-inline"><img src={img1} alt="" /></Link>
                  <span className="fs-sm"><strong>You</strong> searched using a keyword <strong>"restaurant"</strong></span>
                  <span className="fs-xs text-secondary ms-auto">10:00am</span>
                </p>
              </li>
              <li className="activity-date">Aug 28, 2023</li>
              <li className="activity-item search">
                <p className="d-sm-flex align-items-center mb-0">
                  <Link to="" className="avatar avatar-xs me-2 d-none d-sm-inline"><img src={img1} alt="" /></Link>
                  <span className="fs-sm"><strong>You</strong> searched using a keyword <strong>"software engineer"</strong></span>
                  <span className="fs-xs text-secondary ms-auto">02:23pm</span>
                </p>
              </li>
              <li className="activity-item search">
                <p className="d-sm-flex align-items-center mb-0">
                  <Link to="" className="avatar avatar-xs me-2 d-none d-sm-inline"><img src={img1} alt="" /></Link>
                  <span className="fs-sm"><strong>You</strong> searched using a keyword <strong>"ui developer"</strong></span>
                  <span className="fs-xs text-secondary ms-auto">02:15pm</span>
                </p>
              </li>
            </ul> */}

          </Col>
        </Row>
        <Footer />
      </div>
    </React.Fragment>
  );
}
