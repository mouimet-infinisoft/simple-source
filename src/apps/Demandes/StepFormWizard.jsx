import React, { useState } from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { getValue, useBrainStack } from '../../App';
import Header from "../../layouts/Header";
import PerfectScrollbar from "react-perfect-scrollbar";
import ContactForm from '../Contacts/ContactForm';
import DemandesDetailsHeader from './DemandesDetailsHeader';

function StepFormWizard() {
  const { id } = useParams()
  const [key, setKey] = useState('step1');
    const bstack = useBrainStack()
  const { list, search, create, update, delete: trash } = bstack.store.createCRUDObject('contacts')
  const [selectedId, setSelectedId] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleNext = () => {
    if (key === 'step1') setKey('step2');
    else if (key === 'step2') setKey('step3');
  };

  const handlePrev = () => {
    if (key === 'step2') setKey('step1');
    else if (key === 'step3') setKey('step2');
  };

  return (
    <React.Fragment>
      <Header />
      <div className={"main main-file-manager p-3 p-lg-4"}>
      <h1><Link to='/apps/demandes'><i class="ri-arrow-left-line"></i></Link> Demande</h1>
        <DemandesDetailsHeader />
        <div>
          <Tabs
            id="step-form-wizard"
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >
            <Tab eventKey="step1" title="Contacts">
              <ContactForm selectedId={selectedId} handleShowDeleteContact={()=>{setShowDeleteConfirm(true)}} handleUpdate={()=>{}}/>
            </Tab>
            <Tab eventKey="step2" title="Services">
              {/* Your Step 2 form content goes here */}
              <p>Content for Step 2</p>
            </Tab>
            <Tab eventKey="step3" title="Disponibilités">
              {/* Your Step 3 form content goes here */}
              <p>Content for Step 3</p>
            </Tab>
          </Tabs>

          <div className="mt-3">
            <Button style={{marginRight:'0.5rem'}} onClick={handlePrev} disabled={key === 'step1'}>
              Previous
            </Button>
            <Button onClick={handleNext} className="ml-2" disabled={key === 'step3'}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default StepFormWizard;
