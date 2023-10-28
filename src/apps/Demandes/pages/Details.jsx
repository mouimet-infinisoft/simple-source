import React, { useState } from 'react';
import { Tabs, Tab, Form } from 'react-bootstrap';
import { useParams, Link, Outlet } from 'react-router-dom';
import { createEventHandlerMutator, getValue, useBrainStack } from '../../../App';
import Header from "../../../layouts/Header";
import DemandesDetailsHeader from '../components/DemandesDetailsHeader';
import ServiceOptions from '../components/ServiceOptions';
import Activity from '../../../pages/Activity';

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
            <h1><Link to='/apps/demandes'><i class="ri-arrow-left-line"></i></Link> Demande</h1>
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
          </Tabs>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DemandesDetails;
