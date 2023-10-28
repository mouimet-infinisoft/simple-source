import React, { useEffect, useState } from 'react';
import { Card, CardGroup, Button } from 'react-bootstrap';
// import ContactForm from '../../Contacts/ContactForm';
// import ContactCardList from '../../Contacts/ContactCardList';
// import { contactList } from '../../Contacts/contactList';
// import { getValue } from '../../../App';
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { getValue, useBrainStack } from '../../../App';
import { defaultModelContact } from '../../Contacts/Contacts';

function ContactCreate() {
    const bstack = useBrainStack()
    const { demandeId } = useParams()
    const { create } = bstack.store.createCRUDObject(`contacts`)
    const { update } = bstack.store.createCRUDObject(`demandes`)
    const [contactId, setContactId] = useState(null)


    useEffect(() => {
        bstack.log.info('Demande id ', demandeId)
        const _contact = create(defaultModelContact)
        bstack.log.info('Created contact ', _contact)
        update({ id: demandeId, contacts: [...getValue(`demandes.${demandeId}.contacts`), { id: _contact.id }] })
        bstack.log.info('Linked contact with demandes ', getValue(`demandes.${demandeId}`))
        setContactId(_contact?.id)

    }, [])


    return <>
        Creating contact...
        {contactId && <Navigate to={`/apps/demandes/${demandeId}/contacts/${contactId}/edit`} />}
    </>
}

export default ContactCreate;
