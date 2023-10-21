import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

function ContactCard(props) {
    const { id, thumb, name, contact, address, jobtitle } = props.data;

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`contacts/${id}/edit`);
    }

    return (
        <Card style={{ width: '18rem', height: '20rem', overflow: 'hidden', cursor:'pointer' }} onClick={handleCardClick}>
            {thumb && <Card.Img variant="top" src={thumb} style={{maxHeight: '8rem', objectFit: 'cover'}} />}
            <Card.Body>
                <Card.Title style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {name}
                </Card.Title>
                <Card.Text>
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <strong>Job:</strong> {jobtitle}
                    </div>
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <strong>Contact:</strong> {contact}
                    </div>
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <strong>Address:</strong> {address}
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ContactCard;
