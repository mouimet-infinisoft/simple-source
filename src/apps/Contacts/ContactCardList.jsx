import React from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import ContactCard from './ContactCard';
import {useNavigate} from 'react-router-dom'

function ContactCardList({ contacts }) {
    const navigate = useNavigate()
    return (
        <Container fluid>
            <Row className="g-4">
                <Col md={4}>
                    <Card style={{ width: '18rem', height: '20rem', overflow: 'hidden', cursor:'pointer' }} onClick={()=>{navigate(`contacts/new`)}}>
                        <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                            <Button variant="link" size="lg" className="mb-2">
                                <i className="ri-add-line ri-2x"></i>
                            </Button>
                            <Card.Title>Ajouter</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                {Object.values(contacts).map(contact => (
                    <Col md={4} key={contact.id}>
                        <ContactCard data={contact} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ContactCardList;
