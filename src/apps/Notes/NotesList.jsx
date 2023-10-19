import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import { useBrainStack } from '../../App';
import ListSideBar from '../../components/atoms/ListComponent';
import { useNotes } from './useNotes';

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

  const {
    showTitle,
    editorState,
    onEditorChange,
    getActiveNote,
    onSelectItem,
    onClickTitle,
    onChangeTitle,
    onBlurTitle,
    onCreate,
  } = useNotes({
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
            onSelectItem={onSelectItem}
            onClickCreate={onCreate}
          />
          {activeNote && (
            <div className="contact-body p-3">
              <div>
                {showTitle && (
                  <h3>
                    <span
                      className="label label-default"
                      onClick={onClickTitle}
                      htmlFor="textBoxName"
                    >
                      {activeNote.name}
                    </span>
                  </h3>
                )}
                {!showTitle && (
                  <input
                    value={activeNote.name}
                    className="form-control"
                    type="text"
                    id="textBoxName"
                    name="textBoxName"
                    onChange={onChangeTitle}
                    onBlur={onBlurTitle}
                  />
                )}
              </div>

              <hr />

              <Editor
                editorState={editorState}
                onEditorStateChange={onEditorChange}
                localization={{
                  locale: 'fr',
                }}
              />
            </div>
          )}
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}
