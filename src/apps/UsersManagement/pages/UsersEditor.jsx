import React from 'react';
import Form from 'react-bootstrap/Form';
import Header from '../../../layouts/Header';
import { getValue, createEventHandlerMutator, useBrainStack } from '../../../App';
import { useParams,Link } from 'react-router-dom';

export default function UsersEditor() {
  const { userId } = useParams();
  const bstack = useBrainStack()

  return (
    <>
      <Header />
      <div className="main main-app p-3 p-lg-4">
      <div className="py-4 mb-2 bg-body-tertiary rounded-3">
          <div className="container-fluid">
            <h1><Link to='/apps/staff'><i class="ri-arrow-left-line"></i></Link> Employé</h1>
          </div>
        </div>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Adresse e-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Entrez votre adresse e-mail"
              value={getValue(`users.${userId}.email`)}
              onChange={createEventHandlerMutator(`users.${userId}.email`)}
            />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Mot de passe"
              value={getValue(`users.${userId}.password`)}
              onChange={createEventHandlerMutator(`users.${userId}.password`)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez votre nom"
              value={getValue(`users.${userId}.name`)}
              onChange={createEventHandlerMutator(`users.${userId}.name`)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmployeeID">
            
            <Form.Label>ID employé</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez votre ID employé"
              value={getValue(`users.${userId}.employeeId`)}
              onChange={createEventHandlerMutator(`users.${userId}.employeeId`)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDepartment">
            
            <Form.Label>Département</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez votre département"
              value={getValue(`users.${userId}.department`)}
              onChange={createEventHandlerMutator(`users.${userId}.department`)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicRole">
            
            <Form.Label>Rôle</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez votre rôle"
              value={getValue(`users.${userId}.role`)}
              onChange={createEventHandlerMutator(`users.${userId}.role`)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicContactNumber">
            
            <Form.Label>Numéro de contact</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez votre numéro de contact"
              value={getValue(`users.${userId}.contactNumber`)}
              onChange={createEventHandlerMutator(
                `users.${userId}.contactNumber`
              )}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAddress">
            
            <Form.Label>Adresse</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez votre adresse"
              value={getValue(`users.${userId}.address`)}
              onChange={createEventHandlerMutator(`users.${userId}.address`)}
            />
          </Form.Group>
        </Form>
      </div>
    </>
  );
}
