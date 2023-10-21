import React from 'react';
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom'


const ContactSearch = () => {
    const { demandeId } = useParams()
    const navigate = useNavigate()

    return (
        <div>
            <h2>Recherche de contact</h2>
            {/* Votre formulaire ou composant de recherche ici */}
            <p>Formulaire de recherche...</p>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <Button onClick={() => { navigate(`/apps/demandes/${demandeId}`) }}>Retour aux contacts</Button>
            </div>
        </div>
    )
};

export default ContactSearch