import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import { useBrainStack } from '../../App';
import { Button, Nav } from 'react-bootstrap';
import ListSideBar from '../../components/atoms/ListComponent';
import { useNotes } from './useNotes';

export default function NotesList() {
  const bstack = useBrainStack();
  const {
    list,
    create,
    update,
    delete: trash,
  } = bstack.store.createCRUDObject('notes');

  const notes = list();

  const { onDeleteItem, onSelectItem } = useNotes({
    notes,
    create,
    update,
    trash,
  });

  const entries = Object.entries(notes);

  const notesCount = entries?.length || '';

  return (
    <React.Fragment>
      <Header />

      <div className="main main-app p-3 p-lg-4">
        <div className="contact-panel sidebar-show">
          <ListSideBar
            buttonAddLabel="Ajouter"
            basketLabel="Corbeille"
            totalLabel="Tous les notes"
            iconTotal="ri-sticky-note-fill"
            entries={entries}
            totalAmount={notesCount}
            onRightIconClick={onDeleteItem}
            onSelectItem={onSelectItem}
            onClickCreate={() => {}}
          />

          {JSON.stringify(notes, null, 2)}
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}
