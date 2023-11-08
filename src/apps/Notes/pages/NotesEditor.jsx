import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
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
import { editorHeader, useNotes } from './useNotes';
import { Button } from 'react-bootstrap';
import Typewriter from 'typewriter-effect';
import BrainPulse from '../../../components/atoms/BrainPulse';

const NotesEditor = ({ isReport }) => {
  const { state } = useLocation();
  const bstack = useBrainStack();
  const { noteId } = useParams();
  const status = getValue(`notes.${noteId}.status`);
  const isBrouillon = status === 'Brouillon';
  const isApprovalRequired = status === 'Approbation requise';
  // const isApproved = status === 'Approuvée'
  const isRefused = status === 'Rejetée';
  const { onFileChange, items } = useNotes();
  const [isProcessing, setIsProcessing] = useState(false);
  const [noteTyping, setNoteTyping] = useState(null);
  bstack.useOn('notes.ai.transcription.processing', () => {
    setIsProcessing(true);
  });
  bstack.useOn('notes.ai.transcription.incoming', ({ note }) => {
    setNoteTyping(note);
  });
  bstack.useOn('notes.ai.transcription.complete', () => {
    setIsProcessing(false);
  });

  if (isReport) {
    const selected = items.filter((x) => state.has(x.id));
    console.log('selected items', selected.length);
  }

  const linkTo = `/apps/${isReport ? 'reports' : 'notes'}`;

  return (
    <>
      <Header />

      <div className="main main-app p-3 p-lg-4">
        <div className="container-fluid">
          <h1>
            <Link to={linkTo}>
              <i className="ri-arrow-left-line"></i>
            </Link>
            Éditeur notes
          </h1>
        </div>

        <Stats cards={editorHeader(noteId)} />

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
          <label className="btn btn-secondary" htmlFor="fileInput">
            Intellinotes
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            style={{ display: 'none' }} // Hide the actual input element
          />
          <div className="d-flex align-items-center gap-1">
            {(isBrouillon || isRefused) && (
              <Button
                variant="primary"
                className="mr-2"
                onClick={() => {
                  createEventHandlerMutatorShallow(`notes.${noteId}.status`)(
                    'Approbation requise'
                  );
                }}
              >
                Approbation
              </Button>
            )}
            {isApprovalRequired && (
              <>
                <Button
                  variant="success"
                  className="mr-2"
                  onClick={() => {
                    createEventHandlerMutatorShallow(`notes.${noteId}.status`)(
                      'Approuvée'
                    );
                  }}
                >
                  Approuvé
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    createEventHandlerMutatorShallow(`notes.${noteId}.status`)(
                      'Rejetée'
                    );
                  }}
                >
                  Refusé
                </Button>
              </>
            )}
          </div>
        </div>

        <hr />

        {isProcessing && (
          <>
            <BrainPulse />
          </>
        )}

        {noteTyping && (
          <>
            <h2>Transcription Intelligence Artificielle</h2>
            <Typewriter
              options={{
                strings: noteTyping,
                autoStart: true,
                changeDelay: 0,
              }}
            />
          </>
        )}

        <Editor
          editorState={getValue(`notes.${noteId}.content`)}
          onEditorStateChange={createEventHandlerMutatorShallow(
            `notes.${noteId}.content`
          )}
          localization={{
            locale: 'fr',
          }}
        />
      </div>
    </>
  );
};

export default NotesEditor;
