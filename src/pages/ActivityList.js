import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export function ActivityList({ activities }) {
    return (
        <ul className="activity-group mb-5">
            {activities.map((activity, idx) => (
                <React.Fragment key={idx}>
                    <li className="activity-date">{activity.date}</li>
                    {activity.items.map((item, i) => (
                        <li key={i} className={`activity-item ${item.type}`}>
                            <p className="d-sm-flex align-items-center mb-2">
                                <Link to="" className="avatar avatar-xs me-2 d-none d-sm-inline">
                                    <img src={item.avatar} alt="" />
                                </Link>
                                <span className="fs-sm">
                                    <strong>{item.author}</strong> {item.action}
                                </span>
                                <span className="text-secondary fs-xs ms-auto">{item.time}</span>
                            </p>
                            {item.content && (
                                <Card className="card-comment">
                                    <Card.Body>
                                        {item.images ? (
                                            <Row className="g-1 mb-2">
                                                {item.images.map((img, imgIndex) => (
                                                    <Col key={imgIndex} xs="2">
                                                        <img src={img} className="img-fluid" alt="" />
                                                    </Col>
                                                ))}
                                            </Row>
                                        ) : null}
                                        <span>
                                            {item.content} {item.link && <Link to="">{item.link}</Link>}
                                        </span>
                                    </Card.Body>
                                </Card>
                            )}
                        </li>
                    ))}
                </React.Fragment>
            ))}
        </ul>
    );
}
