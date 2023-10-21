import React, { useState } from 'react';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import { useBrainStack, getValue, createEventHandlerMutator } from '../../App';
import ListSideBar from '../../components/atoms/ListComponent';
import { v4 as uuidv4 } from 'uuid';
import {useNavigate, Link} from 'react-router-dom'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const defaultModel = {
  title: '',
  content: '',
};


export default function NotesList() {
  const navigate = useNavigate()
  const bstack = useBrainStack();
  const {
    list,
    create,
    search
  } = bstack.store.createCRUDObject('notes');

  const notes = search(getValue('search'));
  const entries = Object.entries(notes);
  const notesCount = entries?.length || '';

  const onCreate = () => {
    const _newNote = create(defaultModel)
    navigate(`/apps/notes/${_newNote.id}/edit`)
  }

  return (
    <React.Fragment>
      <Header />

      <div className="main main-app p-3 p-lg-4">
        <div className="sidebar-show">
          <button onClick={onCreate}>Create</button>
          {/* <ListSideBar
            buttonAddLabel="Ajouter"
            basketLabel="Corbeille"
            totalLabel="Tous les notes"
            iconTotal="ri-sticky-note-fill"
            entries={[]}
            totalAmount={notesCount}
            onSelectItem={()=>{}}
            onClickCreate={onCreate}
          />           */}
        </div>

        <div>
          {Object.values(notes).map(n=><Link to={`/apps/notes/${n.id}/edit`}>{n?.title}</Link>)}
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}
