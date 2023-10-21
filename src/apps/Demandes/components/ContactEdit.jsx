import ContactForm from '../../Contacts/ContactForm';
import { useBrainStack } from '../../../App';
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom'

const ContactEdit = () => {
    const bstack = useBrainStack()
    const { contactId } = useParams()
    const { demandeId } = useParams()
    const navigate = useNavigate()

    bstack.log.info(`ContactEdit contactId: `, contactId)

    return (

        <div>
            <ContactForm selectedId={contactId} handleShowDeleteContact={() => { }} handleUpdate={() => { }} />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <Button onClick={() => { navigate(`/apps/demandes/${demandeId}`) }}>Retour aux contacts</Button>
            </div>
        </div>
    )
};

export default ContactEdit