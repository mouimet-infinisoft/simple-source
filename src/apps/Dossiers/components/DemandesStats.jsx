import React, { useMemo } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useBrainStack } from '../../../App';

function countStatus(demandes) {
  return Object.values(demandes).reduce((acc, demande) => {
    acc[demande.status] = (acc[demande.status] || 0) + 1;
    return acc;
  }, {});
}

const DemandesStats = () => {
  const bstack = useBrainStack();
  const { list } = bstack.store.createCRUDObject('dossiers');

  const statusCount = useMemo(() => countStatus(list()), [list()]);

  return (
    <Row className="g-3 mb-3">
      <Col xs="6" sm>
        <Card className="card-one">
          <Card.Body className="p-3">
            <div className="d-block fs-40 lh-1 text-primary mb-1">
              <i className="ri-time-line"></i>
            </div>
            <h1 className="card-value mb-0 ls--1 fs-32">
              {statusCount?.['En attente'] ?? '0'}
            </h1>
            <label className="d-block mb-1 fw-medium text-dark">
              En attentes
            </label>
            <small>
              <span className="d-inline-flex text-danger">
                0.7% <i className="ri-arrow-down-line"></i>
              </span>{' '}
              depuis la semaine dernière
            </small>
          </Card.Body>
        </Card>
      </Col>

      <Col xs="6" sm>
        <Card className="card-one">
          <Card.Body className="p-3">
            <div className="d-block fs-40 lh-1 text-ui-02 mb-1">
              <i className="ri-loader-2-line"></i>
            </div>
            <h1 className="card-value mb-0 ls--1 fs-32">
              {statusCount?.['En cours'] ?? '0'}
            </h1>
            <label className="d-block mb-1 fw-medium text-dark">En cours</label>
            <small>
              <span className="d-inline-flex text-success">
                1.2% <i className="ri-arrow-up-line"></i>
              </span>{' '}
              depuis la semaine dernière
            </small>
          </Card.Body>
        </Card>
      </Col>

      <Col sm>
        <Card className="card-one">
          <Card.Body className="p-3">
            <div className="d-block fs-40 lh-1 text-ui-02 mb-1">
              <i className="ri-checkbox-circle-line"></i>
            </div>
            <h1 className="card-value mb-0 ls--1 fs-32">
              {statusCount?.['Terminée'] ?? '0'}
            </h1>
            <label className="d-block mb-1 fw-medium text-dark">
              Terminées
            </label>
            <small>
              <span className="d-inline-flex text-success">
                0.6% <i className="ri-arrow-up-line"></i>
              </span>{' '}
              depuis la semaine dernière
            </small>
          </Card.Body>
        </Card>
      </Col>

      <Col sm>
        <Card className="card-one">
          <Card.Body className="p-3">
            <div className="d-block fs-40 lh-1 text-ui-02 mb-1">
              <i className="ri-close-circle-line"></i>
            </div>
            <h1 className="card-value mb-0 ls--1 fs-32">
              {statusCount?.['Fermée'] ?? '0'}
            </h1>
            <label className="d-block mb-1 fw-medium text-dark">Fermées</label>
            <small>
              <span className="d-inline-flex text-success">
                0.6% <i className="ri-arrow-up-line"></i>
              </span>{' '}
              depuis la semaine dernière
            </small>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default DemandesStats;
