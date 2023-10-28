import { useEffect, useMemo, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import {
  createEventHandlerMutatorShallow,
  getValue,
  useBrainStack,
} from '../../../App';
import { EditorState } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const defaultModel = () => ({
  id: uuidv4(),
  reference: "N0000" + ((Object.keys(getValue('notes'))?.length + 1) ?? 1),
  name: 'Note',
  content: EditorState.createEmpty(),
  status: 'Brouillon',
  created: new Date().toLocaleDateString(),
  dossierId: '',
  eventId: '',
  author: getValue('me.name')
});

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

export const headValues = [
  'Numéro',
  'Titre',
  'Status',
  'Date',
  'Dossier',
  'Evenement',
  'Auteur'
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

function countStatus(x) {
  return Object.values(x).reduce((acc, x) => {
    acc[x.status] = (acc[x.status] || 0) + 1;
    return acc;
  }, {});
}

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

export function useNotes() {
  const bstack = useBrainStack();
  const navigate = useNavigate();
  const {noteId} = useParams()

  const onFileChange = useCallback(async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      bstack.store.emit(`notes.ai.transcription.processing`)
      // const response = await axios.post('http://localhost:5000/smart', formData);
      const response = await axios.post('https://smartnotes-qbits-projects.vercel.app/smart', formData);      
      // createEventHandlerMutatorShallow(`notes.${noteId}.content`)(EditorState.createWithContent(stateFromHTML(response.data.report)))
      bstack.store.emit(`notes.ai.transcription.incoming`,{note:response.data.report})
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      bstack.store.emit(`notes.ai.transcription.complete`)
    }
  }, []);

  useEffect(() => {
    document.body.classList.add('page-app');
    return () => {
      document.body.classList.remove('page-app');
    };
  }, []);

  const { search, update, create, list } =
    bstack.store.createCRUDObject('notes');

  const isActive = (_value) => (getValue('search') === _value ? 'active' : '');

  const statusCount = useMemo(() => countStatus(list()), [list]);

  const onCreate = () => {
    const c = create(defaultModel());
    navigate(`/apps/notes/${c.id}`);
  };

  const onClickFilter = (_value) => () => {
    createEventHandlerMutatorShallow('search')(_value);
  };

  const onChangeStatus = (_value, status) => () => {
    update({ ..._value, status });
  };

  const items = Object.values(search(getValue('search'))).map((x) => {
    return {
      ...x,
      icon: 'ri-sticky-note-line',
      columns: [x.reference, x.title, x.status, x.created, x.dossierId, x.eventId, x.author],
    };
  });

  return {
    items,
    statusCount,
    isActive,
    onChangeStatus,
    onFileChange,
    onCreate,
    onClickFilter,
  };
}


