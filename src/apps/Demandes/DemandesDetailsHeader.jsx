import React, { useMemo } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { getValue, useBrainStack } from "../../App";
import { useParams } from 'react-router-dom';
import { icons } from "./icons";

function countStatus(demandes) {
    return Object.values(demandes).reduce((acc, demande) => {
        acc[demande.status] = (acc[demande.status] || 0) + 1;
        return acc;
    }, {});
}

const DemandesDetailsHeader = () => {
    const { id } = useParams()
    const bstack = useBrainStack();
    const { list } = bstack.store.createCRUDObject('demandes')
    const statusCount = useMemo(() => countStatus(list()), [list()]);

    return (
        <Row className="g-3 mb-3">
            <Col xs="6" sm>
                <Card className="card-one">
                    <Card.Body className="p-3">
                        <div className="d-block fs-40 lh-1 text-primary mb-1">
                            <i className={icons[getValue(`demandes.${id}.status`)]}></i>
                        </div>
                        <h1 className="card-value mb-0 ls--1 fs-32">{getValue(`demandes.${id}.status`)}</h1>
                        <label className="d-block mb-1 fw-medium text-dark">Status</label>
                    </Card.Body>
                </Card>
            </Col>

            <Col xs="6" sm>
                <Card className="card-one">
                    <Card.Body className="p-3">
                        <div className="d-block fs-40 lh-1 text-ui-02 mb-1">
                            <i className="ri-calendar-2-line"></i>
                        </div>
                        <h1 className="card-value mb-0 ls--1 fs-32">{getValue(`demandes.${id}.created`)}</h1>
                        <label className="d-block mb-1 fw-medium text-dark">Créée le</label>
                    </Card.Body>
                </Card>
            </Col>

            <Col sm>
                <Card className="card-one">
                    <Card.Body className="p-3">
                        <div className="d-block fs-40 lh-1 text-ui-02 mb-1">
                            <i className="ri-database-2-line"></i>
                        </div>
                        <h1 className="card-value mb-0 ls--1 fs-32">{getValue(`demandes.${id}.reference`)}</h1>
                        <label className="d-block mb-1 fw-medium text-dark">Référence</label>
                    </Card.Body>
                </Card>
            </Col>

            {/* <Col sm>
                <Card className="card-one">
                    <Card.Body className="p-3">
                        <div className="d-block fs-40 lh-1 text-ui-02 mb-1">
                            <i className="ri-close-circle-line"></i>
                        </div>
                        <h1 className="card-value mb-0 ls--1 fs-32">{statusCount?.["Fermée"] ?? "0"}</h1>
                        <label className="d-block mb-1 fw-medium text-dark">Fermées</label>
                    </Card.Body>
                </Card>
            </Col> */}
        </Row>
    );
};

export default DemandesDetailsHeader;
