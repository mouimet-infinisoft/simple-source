import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { createEventHandlerMutator, getValue, useBrainStack } from '../../App'
import { useNavigate } from 'react-router-dom'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import Header from '../../layouts/Header';

const NotesEditor = () => {
    const bstack = useBrainStack()
    const { delete: trash, update } = bstack.store.createCRUDObject('notes')
    const { noteId } = useParams()
    const navigate = useNavigate()

    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(
            ContentState.createFromText(getValue(`notes.${noteId}.content`))
        )
    );

    const onEditorChange = (e) => {
        setEditorState(e);
        update({
            id: noteId,
            content: e.getCurrentContent().getPlainText()
        });
    };

    return <>
        <Header />

        <div className="main main-app p-3 p-lg-4">
            <h1>Notes editor</h1>
            <div>
                <input
                    value={getValue(`notes.${noteId}.title`)}
                    className="form-control"
                    placeholder='Inscrivez le titre'
                    type="text"
                    id="textBoxName"
                    name="textBoxName"
                    onChange={createEventHandlerMutator(`notes.${noteId}.title`)}
                />
                <button className="btn btn-danger" onClick={() => {
                    trash(getValue(`notes.${noteId}`))
                    navigate(`/apps/notes`)
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
    </>
}

export default NotesEditor