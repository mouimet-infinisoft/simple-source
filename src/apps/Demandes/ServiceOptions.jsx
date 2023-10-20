import React, { useState } from 'react';
import { Card, CardGroup } from 'react-bootstrap';

function ServiceOptions() {
    const [selected, setSelected] = useState(null);

    const handleSelect = (option) => {
        setSelected(option);
    };

    const cardOptions = [
        { id: 1, icon: 'ri-team-line', name: 'Visite supervisée' },
        { id: 2, icon: 'ri-phone-line', name: 'Appel supervisée' },
        { id: 3, icon: 'ri-exchange-line', name: 'Échange de garde' },
        { id: 4, icon: 'ri-service-line', name: 'Autre' }
    ];

    return (
        <CardGroup style={{gap:"1rem"}}>
            {cardOptions.map(option => (
                <Card
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    border={selected === option.id ? 'primary' : ''}
                    className={selected === option.id ? 'shadow-lg hover-pointer' : 'hover-pointer'}
                >
                    <Card.Body className="text-center">
                        <i className={option.icon + " ri-3x"}></i>
                        <Card.Title>{option.name}</Card.Title>
                    </Card.Body>
                </Card>
            ))}
        </CardGroup>
    );
}

export default ServiceOptions;
