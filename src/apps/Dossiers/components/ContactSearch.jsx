import React, {useState} from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom'
import { createEventHandlerMutator, getValue, useBrainStack } from '../../../App';
import ContactSearchList from './ContactSearchList';


const ContactSearch = () => {
    const bstack = useBrainStack()
    const {  dossierId } = useParams()
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')
    const { search } = bstack.store.createCRUDObject('contacts')

    return (
        <div>
            <h2>Recherche de contact</h2>
            <div className="form-search py-2 mb-4">
                <i className="ri-search-line"></i>
                <Form.Control type="text" placeholder="Recherche" value={searchTerm} onChange={e => { setSearchTerm(e.target.value) }} />
            </div>

            <div>
                <ContactSearchList contacts={search(searchTerm)} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <Button onClick={() => { navigate(`/apps/dossiers/${dossierId}`) }}>Retour aux contacts</Button>
            </div>
        </div>
    )
};

export default ContactSearch