import React from 'react';
import { Table } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { getValue, useBrainStack } from '../../../App';

const ContactSearchList = ({ contacts }) => {
    const { dossierId } = useParams()
    const navigate = useNavigate()
    const bstack = useBrainStack()
    const { update } = bstack.store.createCRUDObject(`dossiers`)

    function handleAddContact(_contact) {
        bstack.log.info('Dossier id ', dossierId)
        bstack.log.info('Linked existing contact ', _contact)
        update({ id: dossierId, contacts: [...getValue(`dossiers.${dossierId}.contacts`), { id: _contact.id }] })
        bstack.log.info('Linked contact with dossiers ', getValue(`dossiers.${dossierId}`))
        navigate(`/apps/dossiers/${dossierId}`)
    }
    return (
        <Table className="table table-files" responsive hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Courriels</th>
                    <th>Téléphones</th>
                    <th>Adresse</th>
                </tr>
            </thead>
            <tbody>
                {Object.values(contacts).map(contact => (
                    <tr key={contact.id} onClick={()=>handleAddContact(contact)}>
                        <td>{contact.name}</td>
                        <td>{Array(contact.contact)?.join(', ') ?? ""}</td>
                        <td>{Array(contact.emails)?.join(', ') ?? ""}</td>
                        <td>{Array(contact.phones)?.join(', ') ?? ""}</td>
                        <td>{contact?.address ?? ""}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ContactSearchList;
