import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import { useBrainStack, getValue, createEventHandlerMutator } from '../../App';
import ListSideBar from '../../components/atoms/ListComponent';
import { v4 as uuidv4 } from 'uuid';
import { EditorState, ContentState } from 'draft-js';
import Typewriter from 'typewriter-effect';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const defaultModel = () => ({
  id: uuidv4(),
  name: '',
  content: '',
});


export default function NotesList() {
  const bstack = useBrainStack();
  const {
    list,
    create,
    update,
    delete: trash,
    search
  } = bstack.store.createCRUDObject('notes');
  const [selectedId, setSelectedId] = useState(null)
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(
      ContentState.createFromText(getValue(`notes.${selectedId}.content`))
    )
  );

  const notes = search(getValue('search'));
  const entries = Object.entries(notes);
  const notesCount = entries?.length || '';

  const onEditorChange = (e) => {
    setEditorState(e);
    update({
      id: selectedId,
      content: e.getCurrentContent().getPlainText()
    });
  };

  const onSelectItem = (id) => {
    setSelectedId(id)
    setEditorState(
      EditorState.createWithContent(ContentState.createFromText(getValue(`notes.${id}.content`)))
    );
  };

  const onCreate = () => {
    onSelectItem(create(defaultModel).id)
  }

  return (
    <React.Fragment>
      <Header />

      <div className="main main-app p-3 p-lg-4">
        <div className="sidebar-show">
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
          {selectedId && (
            <div className="contact-body p-3">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <input
                  value={getValue(`notes.${selectedId}.title`)}
                  className="form-control"
                  placeholder='Inscrivez le titre'
                  type="text"
                  id="textBoxName"
                  name="textBoxName"
                  onChange={createEventHandlerMutator(`notes.${selectedId}.title`)}
                />
                <button className="btn btn-danger" onClick={() => {
                  trash(getValue(`notes.${selectedId}`))
                  setSelectedId(null)
                }}>Delete</button>
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
