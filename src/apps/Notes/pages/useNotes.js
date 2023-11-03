import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EditorState } from 'draft-js';
import axios from 'axios';
import { getValue, useBrainStack } from '../../../App';
import { useCrud } from '../../../modules/hooks';

const defaultModel = () => ({
  id: uuidv4(),
  reference: 'N0000' + (Object.keys(getValue('notes'))?.length + 1 ?? 1),
  name: 'Note',
  content: EditorState.createEmpty(),
  status: 'Brouillon',
  created: new Date().toLocaleDateString(),
  dossierId: '',
  eventId: '',
  author: getValue('me.name'),
});

export function useNotes() {
  const bstack = useBrainStack();
  const crud = useCrud('/apps/notes', 'notes', defaultModel());
  const [checked, setChecked] = useState(new Set());

  const onFileChange = useCallback(
    async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('image', file);

      try {
        bstack.store.emit(`notes.ai.transcription.processing`);
        const response = await axios.post(
          'https://smartnotes-qbits-projects.vercel.app/smart',
          formData
        );
        bstack.store.emit(`notes.ai.transcription.incoming`, {
          note: response.data.report,
        });
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        bstack.store.emit(`notes.ai.transcription.complete`);
        event.target.value = null;
      }
    },
    [bstack.store]
  );

  const onCheckToggle = (id) => {
    const newSet = new Set(checked);
    if (checked.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setChecked(newSet);
  };

  const items = crud.searchItems((x) => {
    return {
      ...x,
      icon: 'ri-sticky-note-line',
      checked: checked.has(x.id),
      columns: [
        x.reference,
        x.title,
        x.status,
        x.created,
        x.dossierId,
        x.eventId,
        x.author,
      ],
    };
  });

  return {
    ...crud,
    items,
    checked,
    onFileChange,
    onCheckToggle,
  };
}

export const sidebar = [
  { icon: 'ri-asterisk', id: '', label: 'Tous' },
  { icon: 'ri-edit-circle-line', id: 'Brouillon', label: 'Brouillon' },
  {
    icon: 'ri-folder-unknow-line',
    id: 'Approbation requise',
    label: 'Approbation requise',
  },
  { icon: 'ri-checkbox-circle-line', id: 'Approuvée', label: 'Approuvée' },
  { icon: 'ri-close-circle-line', id: 'Rejetée', label: 'Rejetée' },
];

export const headValues = [
  'Numéro',
  'Titre',
  'Status',
  'Date',
  'Dossier',
  'Evenement',
  'Auteur',
];

export const header = [
  {
    id: 'Brouillon',
    label: 'Brouillon',
    icon: 'ri-edit-circle-line',
    isDown: true,
    value: '0.7%',
    count: 3,
    info: 'depuis la semaine dernière',
  },
  {
    id: 'Approbation requise',
    label: 'Approbation requise',
    icon: 'ri-folder-unknow-line',
    isDown: true,
    value: '0.7%',
    count: 3,
    info: 'depuis la semaine dernière',
  },
  {
    id: 'Approuvée',
    label: 'Approuvée',
    icon: 'ri-checkbox-circle-line',
    isDown: true,
    value: '0.7%',
    count: 3,
    info: 'depuis la semaine dernière',
  },
  {
    id: 'Rejetée',
    label: 'Rejetée',
    icon: 'ri-close-circle-line',
    isDown: false,
    value: '0.6%',
    count: 4,
    info: 'depuis la semaine dernière',
  },
];

export const more = [
  {
    id: 'Approbation requise',
    label: 'Approbation requise',
    className: 'move',
    icon: 'ri-loader-2-line',
  },
  {
    id: 'Approuvées',
    label: 'Approuvées',
    className: 'rename',
    icon: 'ri-checkbox-circle-line',
  },
  {
    id: 'Rejetée',
    label: 'Rejetée',
    className: 'delete',
    icon: 'ri-close-circle-line',
  },
];

export const editorHeader = (noteId) => [
  {
    id: 'numero',
    label: 'Numéro',
    icon: 'ri-sticky-note-line',
    count: getValue(`notes.${noteId}.reference`),
  },
  {
    id: 'status',
    label: 'Status',
    icon: 'ri-loader-2-line',
    count: getValue(`notes.${noteId}.status`),
  },
  {
    id: 'Dossier',
    label: 'Dossier',
    icon: 'ri-folder-line',
    count: getValue(`notes.${noteId}.dossierId`),
  },
  {
    id: 'Date',
    label: 'Date',
    icon: 'ri-calendar-line',
    count: getValue(`notes.${noteId}.created`),
  },
  {
    id: 'Auteur',
    label: 'Auteur',
    icon: 'ri-team-fill',
    count: getValue(`notes.${noteId}.author`),
  },
];
