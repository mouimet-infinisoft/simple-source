import React, { useState } from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';

function StepFormWizard() {
  const [key, setKey] = useState('step1');

  const handleNext = () => {
    if (key === 'step1') setKey('step2');
    else if (key === 'step2') setKey('step3');
  };

  const handlePrev = () => {
    if (key === 'step2') setKey('step1');
    else if (key === 'step3') setKey('step2');
  };

  return (
    <div>
      <Tabs
        id="step-form-wizard"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="step1" title="Step 1">
          {/* Your Step 1 form content goes here */}
          <p>Content for Step 1</p>
        </Tab>
        <Tab eventKey="step2" title="Step 2">
          {/* Your Step 2 form content goes here */}
          <p>Content for Step 2</p>
        </Tab>
        <Tab eventKey="step3" title="Step 3">
          {/* Your Step 3 form content goes here */}
          <p>Content for Step 3</p>
        </Tab>
      </Tabs>

      <div className="mt-3">
        <Button onClick={handlePrev} disabled={key === 'step1'}>
          Previous
        </Button>
        <Button onClick={handleNext} className="ml-2" disabled={key === 'step3'}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default StepFormWizard;
