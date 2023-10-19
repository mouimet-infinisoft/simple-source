import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EditorState, ContentState } from 'draft-js';

const defaultModel = () => ({
  id: uuidv4(),
  name: 'Untitled',
  content: '',
});

export function useNotes({ notes, create, update, trash, logger }) {
  useEffect(() => {
    document.body.classList.add('page-app');
    return () => {
      document.body.classList.remove('page-app');
    };
  }, []);

  const entries = () => Object.entries({ ...notes });

  const getActiveNote = () =>
    entries()?.filter(([_idx, payload]) => payload.isActive)[0];

  const [showTitle, setShowTitle] = useState(true);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(
      ContentState.createFromText(getActiveNote()[1].content)
    )
  );

  const onCreate = () => {
    const newModel = defaultModel();
    create(newModel);
  };

  const onSelectItem = (id) => {
    let active = undefined;

    entries().forEach(([idx, payload]) => {
      payload.isActive = idx === id;
      if (payload.isActive) {
        active = payload;
      }
      update(payload);
    });

    setEditorState(
      EditorState.createWithContent(ContentState.createFromText(active.content))
    );
  };

  const onEditorChange = (e) => {
    setEditorState(e);
    const active = getActiveNote()[1];
    active.content = e.getCurrentContent().getPlainText();
    update(active);
  };

  const onClickTitle = () => setShowTitle(false);

  const onBlurTitle = () => setShowTitle(true);

  const onChangeTitle = (e) => {
    const active = getActiveNote()[1];
    active.name = e.currentTarget.value;
    update(active);
  };

  return {
    showTitle,
    editorState,
    setEditorState,
    getActiveNote,
    onSelectItem,
    onEditorChange,
    onClickTitle,
    onChangeTitle,
    onBlurTitle,
    onCreate,
  };
}
