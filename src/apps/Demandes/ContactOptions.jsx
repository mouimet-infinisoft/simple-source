import React, { useState } from 'react';
import { Card, CardGroup } from 'react-bootstrap';

function ContactOptions() {
    const [selected, setSelected] = useState(null);

    const handleSelect = (option) => {
        setSelected(option);
    };

    const cardOptions = [
        { id: 1, icon: 'ri-add-line', name: 'Nouveau' },
        { id: 2, icon: 'ri-search-line', name: 'Existant' },
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

export default ContactOptions;
