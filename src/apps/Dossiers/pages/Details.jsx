import React, { useState } from 'react';
import { Tabs, Tab, Form } from 'react-bootstrap';
import { useParams, Link, Outlet } from 'react-router-dom';
import { createEventHandlerMutator, getValue, useBrainStack } from '../../../App';
import Header from "../../../layouts/Header";
import DemandesDetailsHeader from '../components/DemandesDetailsHeader';
import ServiceOptions from '../components/ServiceOptions';
import Activity from '../../../pages/Activity';
import AppCalendar, { CalendarComponent } from '../../AppCalendar/AppCalendar';
import NotesList, { NotesListComponent } from '../../Notes/pages/NotesList';

function DemandesDetails() {
  const { demandeId } = useParams()
  const [key, setKey] = useState('step1');
  const bstack = useBrainStack()

  return (
    <React.Fragment>
      <Header />
      <div className={"main main-file-manager p-3 p-lg-4"}>
        <div className="py-4 mb-2 bg-body-tertiary rounded-3">
          <div className="container-fluid">
            <h1><Link to='/apps/dossiers'><i class="ri-arrow-left-line"></i></Link> Dossier</h1>
          </div>
        </div>
        <DemandesDetailsHeader />
        <div>
          <Tabs
            id="step-form-wizard"
            activeKey={key}
            onSelect={setKey}

          >
            <Tab eventKey="step1" title="Contacts" className="p-3">
              <Outlet />
            </Tab>
            <Tab eventKey="step2" title="Services" className="p-3">
              <ServiceOptions />
            </Tab>
            <Tab eventKey="step3" title="Notes" className="p-3">
              <Form.Group className="mt-3">
                <Form.Control as="textarea" rows={8} placeholder="Entrez vos notes ici..." value={getValue(`demandes.${demandeId}.notes`)} onChange={createEventHandlerMutator(`demandes.${demandeId}.notes`)} />
              </Form.Group>
            </Tab>
            <Tab eventKey="step4" title="Historique" className="p-3">
              <Activity />
            </Tab>
            <Tab eventKey="step5" title="Rendez-vous" className="p-3">
              <div style={{ position: 'relative', height: '500px' }}>
                <CalendarComponent />
              </div>
            </Tab>
            <Tab eventKey="step6" title="Taches" className="p-3">
              Taches
            </Tab>
            <Tab eventKey="step8" title="Notes observations" className="p-3" style={{ marginLeft: '0px' }}>
              <div style={{ position: 'relative', height: '500px' }}>
                <NotesListComponent />
              </div>
            </Tab>
            <Tab eventKey="step9" title="Rapports" className="p-3">
              Rapports
            </Tab>
          </Tabs>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DemandesDetails;
