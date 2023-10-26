import { useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import {
  createEventHandlerMutatorShallow,
  getValue,
  useBrainStack,
} from '../../../App';

const defaultModel = () => ({
  id: uuidv4(),
  name: 'Note',
  content: '',
  status: '',
  created: new Date().toLocaleDateString(),
  dossierId: '',
  eventId: '',
});

export const header = [
  {
    id: 'Brouillon',
    label: 'Brouillon',
    icon: 'ri-time-line',
    isDown: true,
    value: '0.7%',
    count: 3,
    info: 'lorem ipsum dolor sit amet, consectetur',
  },
  {
    id: 'Approbation requise',
    label: 'Approbation requise',
    icon: 'ri-loader-2-line',
    isDown: true,
    value: '0.7%',
    count: 3,
    info: 'lorem ipsum dolor sit amet, consectetur',
  },
  {
    id: 'Approuvées',
    label: 'Approuvées',
    icon: 'ri-checkbox-circle-line',
    isDown: true,
    value: '0.7%',
    count: 3,
    info: 'lorem ipsum dolor sit amet, consectetur',
  },
  {
    id: 'Rejetée',
    label: 'Rejetée',
    icon: 'ri-close-circle-line',
    isDown: false,
    value: '0.6%',
    count: 4,
    info: 'lorem ipsum dolor sit amet, consectetur',
  },
];

export const headValues = [
  'Numéro',
  'Title',
  'Status',
  'Date',
  'Dossier ID',
  'Event ID',
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
  { icon: 'ri-time-line', id: 'Brouillon', label: 'Brouillon' },
  {
    icon: 'ri-loader-2-line',
    id: 'Approbation requise',
    label: 'Approbation requise',
  },
  { icon: 'ri-checkbox-circle-line', id: 'Approuvées', label: 'Approuvées' },
  { icon: 'ri-close-circle-line', id: 'Rejetée', label: 'Rejetée' },
];

function countStatus(x) {
  return Object.values(x).reduce((acc, x) => {
    acc[x.status] = (acc[x.status] || 0) + 1;
    return acc;
  }, {});
}

export function useNotes() {
  const bstack = useBrainStack();
  const navigate = useNavigate();

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
      columns: [x.id, x.title, x.status, x.created, x.dossierId, x.eventId],
    };
  });

  return {
    items,
    statusCount,
    isActive,
    onChangeStatus,
    onCreate,
    onClickFilter,
  };
}
