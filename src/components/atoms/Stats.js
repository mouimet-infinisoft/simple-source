import { Card, Col, Row } from 'react-bootstrap';

const Stats = ({ cards }) => {
  return (
    <Row className="g-3 mb-3">
      {cards?.map(({ id, label, icon, isDown, value, count, info }) => {
        const classDown = isDown ? 'text-danger' : 'text-success';
        const arrow = isDown ? 'ri-arrow-down-line' : 'ri-arrow-up-line';

        return (
          <Col xs="6" sm key={id}>
            <Card className="card-one">
              <Card.Body className="p-3">
                <div className="d-block fs-40 lh-1 text-primary mb-1">
                  <i className={icon}></i>
                </div>
                <h1 className="card-value mb-0 ls--1 fs-32">{count}</h1>
                <label className="d-block mb-1 fw-medium text-dark">
                  {label}
                </label>
                {(value && arrow && info) && <small>
                  <span className={`d-inline-flex ${classDown}`}>
                    {value} <i className={arrow}></i>
                  </span>{' '}
                  {info}
                </small>}
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default Stats;
