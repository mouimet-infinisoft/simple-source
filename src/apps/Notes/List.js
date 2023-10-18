import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import { useBrainStack } from '../../App';
import { Button, Nav } from 'react-bootstrap';
import ListSideBar from '../../components/atoms/ListComponent';

export default function NotesList() {
  const bstack = useBrainStack();
  const { list } = bstack.store.createCRUDObject('notes');

  return (
    <React.Fragment>
      <Header />

      <div className="main main-app p-3 p-lg-4">
        <div className="contact-panel sidebar-show">
          <ListSideBar
            buttonAddLabel="Ajouter"
            basketLabel="Corbeille"
            totalLabel="Tous les contacts"
            totalAmount={11}
            onClickCreate={() => {}}
          />

          {JSON.stringify(list())}
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}
