import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DemandesLayout from './layouts/DemandesLayout';
import DemandesDetails from './pages/Details';
import ContactNew from './components/ContactNew';
import ContactSearch from './components/ContactSearch';
import ContactEdit from './components/ContactEdit';
import DemandesList from './pages/List';
import DemandeContactList from './components/DemandeContactList';

function DemandesRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DemandesLayout />}>
                <Route index element={<DemandesList />} />
                <Route path=":demandeId/*" element={<DemandesDetails />}>
                    <Route index element={<DemandeContactList />} />
                    <Route path="contacts/new" element={<ContactNew />} />
                    <Route path="contacts/search" element={<ContactSearch />} />
                    <Route path="contacts/:contactId/edit" element={<ContactEdit />} />
                </Route>
            </Route>
        </Routes>
    );
}
export default DemandesRoutes;
