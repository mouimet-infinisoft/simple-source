import { useEffect } from 'react';

export function useNotes({ notes, create, update, trash, logger }) {
  useEffect(() => {
    document.body.classList.add('page-app');
    return () => {
      document.body.classList.remove('page-app');
    };
  }, []);

  const onSelectItem = (id) => {
    console.log(notes);
    Object.entries({ ...notes }).forEach(([idx, payload]) => {
      payload.isActive = idx === id;
      update(payload);
    });
    console.log('select', id);
  };

  const onDeleteItem = (id) => {
    console.log('trash', id);
  };

  return {
    onDeleteItem,
    onSelectItem,
  };
}
