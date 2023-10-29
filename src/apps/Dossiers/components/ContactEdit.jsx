import ContactForm from '../../Contacts/ContactForm';
import { getValue, useBrainStack } from '../../../App';
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom'
import ConfirmModal from '../../../components/atoms/ConfirmModal';
import { useState } from 'react';

const ContactEdit = () => {
    const bstack = useBrainStack()
    const { contactId } = useParams()
    const { dossierId } = useParams()
    const navigate = useNavigate()
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const { update } = bstack.store.createCRUDObject('dossiers')
    const { update: updateContact } = bstack.store.createCRUDObject('contacts')

    bstack.log.info(`ContactEdit contactId: `, contactId)
    const handleHideDeleteContact = () => setShowDeleteConfirm(false)
    const handleShowDeleteContact = () => setShowDeleteConfirm(true)
    const handleDeleteContact = () => {
        bstack.log.info('Dossier id ', dossierId)
        const _dossier = getValue(`dossiers.${dossierId}`)
        bstack.log.info('Dossiers before update', _dossier)
        const newContacts = Array(..._dossier.contacts).filter(({ id }) => id !== contactId)
        bstack.log.info('newContacts ', newContacts)
        update({ id: dossierId, contacts: newContacts })
        bstack.log.info('Dossiers after update ', getValue(`dossiers.${dossierId}`))
        navigate(`/apps/dossiers/${dossierId}`)
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
                bodyText="Êtes-vous sûr de vouloir retirer le contact de ce dossier?"
                confirmText="Retirer"
                cancelText="Annuler"
            />
            <ContactForm selectedId={contactId} handleShowDeleteContact={handleShowDeleteContact} handleUpdate={handleUpdate} />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <Button onClick={() => { navigate(`/apps/dossiers/${dossierId}`) }}>Retour aux contacts</Button>
            </div>
        </div>
    )
};

export default ContactEdit