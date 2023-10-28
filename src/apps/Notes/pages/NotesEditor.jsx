import React from 'react';
import { useParams } from 'react-router-dom';
import {
  createEventHandlerMutator,
  createEventHandlerMutatorShallow,
  getValue,
  useBrainStack,
} from '../../../App';
import { Link } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import Header from '../../../layouts/Header';
import Stats from '../../../components/atoms/Stats';
import { editorHeader } from './useNotes';
import { Button } from 'react-bootstrap';

const NotesEditor = () => {
  useBrainStack();
  const { noteId } = useParams();
  const status = getValue(`notes.${noteId}.status`)
  const isBrouillon = status === 'Brouillon'
  const isApprovalRequired = status === 'Approbation requise'
  // const isApproved = status === 'Approuvée'
  const isRefused = status === 'Rejetée'

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

        <Stats cards={editorHeader(noteId)} />

        {/* <div>
          <input
            value={getValue(`notes.${noteId}.title`)}
            className="form-control"
            placeholder="Inscrivez le titre"
            type="text"
            id="textBoxName"
            name="textBoxName"
            onChange={createEventHandlerMutator(`notes.${noteId}.title`)}
          />
        </div> */}

        <div className="d-flex align-items-center gap-1">
          <input
            value={getValue(`notes.${noteId}.title`)}
            className="form-control"
            placeholder="Inscrivez le titre"
            type="text"
            id="textBoxName"
            name="textBoxName"
            onChange={createEventHandlerMutator(`notes.${noteId}.title`)}
          />
          <div className="d-flex align-items-center gap-1">
            {(isBrouillon || isRefused) && <Button variant="primary" className="mr-2" onClick={()=>{createEventHandlerMutatorShallow(`notes.${noteId}.status`)('Approbation requise')}}>Demande approbation</Button>}
            {isApprovalRequired && (<>
              <Button variant="success" className="mr-2" onClick={()=>{createEventHandlerMutatorShallow(`notes.${noteId}.status`)('Approuvée')}}>Approuvé</Button>
              <Button variant="danger" onClick={()=>{createEventHandlerMutatorShallow(`notes.${noteId}.status`)('Rejetée')}}>Refusé</Button>
            </>)}

          </div>
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
