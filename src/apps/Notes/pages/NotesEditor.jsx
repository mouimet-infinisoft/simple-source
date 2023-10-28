import React from 'react';
import { useParams } from 'react-router-dom';
import {
  createEventHandlerMutator,
  createEventHandlerMutatorShallow,
  getValue,
  useBrainStack,
} from '../../../App';
import {  Link } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import Header from '../../../layouts/Header';

const NotesEditor = () => {
  useBrainStack();
  const { noteId } = useParams();

  return (
    <>
      <Header />

      <div className="main main-app p-3 p-lg-4">
        <div className="container-fluid">
          <h1>
            <Link to="/apps/notes">
              <i class="ri-arrow-left-line"></i>
            </Link>
            Éditeur notes
          </h1>
        </div>
        <div>
          <input
            value={getValue(`notes.${noteId}.title`)}
            className="form-control"
            placeholder="Inscrivez le titre"
            type="text"
            id="textBoxName"
            name="textBoxName"
            onChange={createEventHandlerMutator(`notes.${noteId}.title`)}
          />
        </div>

        <hr />

        <Editor
          editorState={getValue(`notes.${noteId}.content`)}
          onEditorStateChange={createEventHandlerMutatorShallow(`notes.${noteId}.content`)}
          localization={{
            locale: 'fr',
          }}
        />
      </div>
    </>
  );
};

export default NotesEditor;
