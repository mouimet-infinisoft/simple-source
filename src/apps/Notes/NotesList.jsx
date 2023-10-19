import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import { useBrainStack } from '../../App';
import { Button, Nav } from 'react-bootstrap';
import ListSideBar from '../../components/atoms/ListComponent';
import { useNotes } from './useNotes';
import { Editor } from 'react-draft-wysiwyg';


import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function NotesList() {
  const bstack = useBrainStack();
  const {
    list,
    create,
    update,
    delete: trash,
  } = bstack.store.createCRUDObject('notes');

  const notes = list();

  const { editorState, setEditorState, getActiveNote, onDeleteItem, onSelectItem } = useNotes({
    notes,
    create,
    update,
    trash,
  });

  const entries = Object.entries(notes);

  const notesCount = entries?.length || '';

  const activeNote = getActiveNote()[1];

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
            onClickCreate={() => { }}
          />
          {activeNote && (
            <div className="contact-body p-3">
              <div>
                <h1
                  contentEditable="true"
                  plaintext-only="true"
                  onInput={(e) => console.log(e.target.innerText)}
                >
                  {activeNote.name}
                </h1>
              </div>

              <hr />

              <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                localization={{
                  locale: 'fr',
                }}
              />

              <p>{activeNote.content}</p>
            </div>
          )}

          {/* {JSON.stringify(activeNote, null, 2)} */}
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}
