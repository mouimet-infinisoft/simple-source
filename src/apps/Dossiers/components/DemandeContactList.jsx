import {useParams} from 'react-router-dom'
import ContactCardList from '../../Contacts/ContactCardList';
import { getValue } from '../../../App';

function generateContactList(demande) {
    return demande.contacts.reduce((acc, contact) => {
        acc[contact.id] = getValue(`contacts.${contact.id}`);
        return acc;
    }, {});
}

const DemandeContactList = () => {
    const {demandeId} = useParams()

    return <ContactCardList contacts={generateContactList(getValue(`demandes.${demandeId}`))} />
}

export default DemandeContactList