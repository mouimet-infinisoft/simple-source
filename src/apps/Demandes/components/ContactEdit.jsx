import ContactForm from '../../Contacts/ContactForm';
import { getValue, useBrainStack } from '../../../App';
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom'
import ConfirmModal from '../../../components/atoms/ConfirmModal';
import { useState } from 'react';

const ContactEdit = () => {
    const bstack = useBrainStack()
    const { contactId } = useParams()
    const { demandeId } = useParams()
    const navigate = useNavigate()
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const { update } = bstack.store.createCRUDObject('demandes')
    const { update: updateContact } = bstack.store.createCRUDObject('contacts')

    bstack.log.info(`ContactEdit contactId: `, contactId)
    const handleHideDeleteContact = () => setShowDeleteConfirm(false)
    const handleShowDeleteContact = () => setShowDeleteConfirm(true)
    const handleDeleteContact = () => {
        bstack.log.info('Demande id ', demandeId)
        const _demande = getValue(`demandes.${demandeId}`)
        bstack.log.info('Demandes before update', _demande)
        const newContacts = Array(..._demande.contacts).filter(({ id }) => id !== contactId)
        bstack.log.info('newContacts ', newContacts)
        update({ id: demandeId, contacts: newContacts })
        bstack.log.info('Demandes after update ', getValue(`demandes.${demandeId}`))
        navigate(`/apps/demandes/${demandeId}`)
    }

    function handleUpdate(val, field) {
        const _contact = getValue(`contacts.${contactId}`)
        _contact[field] = val
        _contact.contact = [..._contact.phones, ..._contact.emails][0];
        updateContact(_contact);
        bstack.log.info('Updated: ', _contact);
    };

    return (

        <div>
            <ConfirmModal
                show={showDeleteConfirm}
                onHide={handleHideDeleteContact}
                title={getValue(`contacts.${contactId}.name`)}
                onCancel={handleHideDeleteContact}
                onConfirm={handleDeleteContact}
                bodyText="Êtes-vous sûr de vouloir retirer le contact de cette demande?"
                confirmText="Retirer"
                cancelText="Annuler"
            />
            <ContactForm selectedId={contactId} handleShowDeleteContact={handleShowDeleteContact} handleUpdate={handleUpdate} />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <Button onClick={() => { navigate(`/apps/demandes/${demandeId}`) }}>Retour aux contacts</Button>
            </div>
        </div>
    )
};

export default ContactEdit