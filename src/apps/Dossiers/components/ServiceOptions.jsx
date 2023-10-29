import React, { useState } from 'react';
import { Card, CardGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { createEventHandlerMutatorShallow, getValue } from '../../../App';

function ServiceOptions() {
    const { dossierId } = useParams()

    const cardOptions = [
        { id: 1, icon: 'ri-team-line', name: 'Visite supervisée' },
        { id: 2, icon: 'ri-phone-line', name: 'Appel supervisée' },
        { id: 3, icon: 'ri-exchange-line', name: 'Échange de garde' },
        { id: 4, icon: 'ri-service-line', name: 'Autre' }
    ];

    return (
        <CardGroup style={{ gap: "1rem" }}>
            {cardOptions.map(option => (
                <Card
                    key={option.id}
                    onClick={() => { createEventHandlerMutatorShallow(`dossiers.${dossierId}.service`)(option.name) }}
                    border={getValue(`dossiers.${dossierId}.service`) === option.name ? 'primary' : ''}
                    className={getValue(`dossiers.${dossierId}.service`) === option.name ? 'shadow-lg hover-pointer' : 'hover-pointer'}
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
