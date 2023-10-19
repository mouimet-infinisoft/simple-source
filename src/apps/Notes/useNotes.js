import { useEffect, useState } from 'react';
import { EditorState,convertFromHTML } from 'draft-js';


export function useNotes({ notes, create, update, trash, logger }) {
  useEffect(() => {
    document.body.classList.add('page-app');
    return () => {
      document.body.classList.remove('page-app');
    };
  }, []);

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  const entries = () => Object.entries({ ...notes });

  const getActiveNote = () =>
    entries()?.filter(([idx, payload]) => payload.isActive)[0];

  const onSelectItem = (id) => {
    Object.entries({ ...notes }).forEach(([idx, payload]) => {
      payload.isActive = idx === id;
      update(payload);
    });
  };

  const onDeleteItem = (id) => {
    console.log('trash', id);
  };

  return {
    editorState,
    setEditorState,
    getActiveNote,
    onDeleteItem,
    onSelectItem,
  };
}
