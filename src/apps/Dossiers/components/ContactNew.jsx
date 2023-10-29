import React from 'react';
import { Card, CardGroup, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom'
import { getValue, useBrainStack } from '../../../App';
import { defaultModelContact } from '../../Contacts/Contacts';

function ContactNew() {
    const { dossierId } = useParams()
    const navigate = useNavigate()
    const bstack = useBrainStack()
    const { create } = bstack.store.createCRUDObject(`contacts`)
    const { update } = bstack.store.createCRUDObject(`dossiers`)

    function handleCreate() {
        bstack.log.info('Dossier id ', dossierId)
        const _contact = create(defaultModelContact)
        bstack.log.info('Created contact ', _contact)
        update({ id: dossierId, contacts: [...getValue(`dossiers.${dossierId}.contacts`), { id: _contact.id }] })
        bstack.log.info('Linked contact with dossiers ', getValue(`dossiers.${dossierId}`))
        navigate(`/apps/dossiers/${dossierId}/contacts/${_contact.id}/edit`)
    }

    const cardOptions = [
        { id: 1, icon: 'ri-add-line', name: 'Nouveau', handleClick: handleCreate },
        { id: 2, icon: 'ri-search-line', name: 'Existant', handleClick: () => { navigate(`/apps/dossiers/${dossierId}/contacts/search`) } },
    ];

    return (
        <div>
            <CardGroup style={{ gap: "1rem" }}>
                {cardOptions.map(option => (
                    <Card
                        key={option.id}
                        onClick={option.handleClick}
                        className={'hover-pointer'}
                    >
                        <Card.Body className="text-center">
                            <i className={option.icon + " ri-3x"}></i>
                            <Card.Title>{option.name}</Card.Title>
                        </Card.Body>
                    </Card>
                ))}
            </CardGroup>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <Button onClick={() => { navigate(`/apps/dossiers/${dossierId}`) }}>Retour aux contacts</Button>
            </div>
        </div>
    );
}

export default ContactNew;
