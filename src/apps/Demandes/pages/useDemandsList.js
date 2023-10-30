import { useState } from 'react';
import { getValue } from '../../../App';
import { defaultModel } from '../assets/datamock';
import { useCrud } from '../../../modules/hooks';

export function useDemandsList() {
  // toggle sidebar in mobile
  const [isSidebarShow] = useState(false);
  const crud = useCrud('/apps/demandes', 'demandes', defaultModel());

  const { search } = crud;

  const items = Object.values(search(getValue('search'))).map((x) => {
    let contactsString = '';
    if (Array.isArray(x?.contacts)) {
      contactsString = x.contacts
        ?.map(({ id }) => getValue(`contacts.${id}.name`))
        ?.join(', ');
    }

    return {
      ...x,
      columns: [x.reference, x.created, x.status, contactsString, x.service],
    };
  });

  return {
    ...crud,
    items,
    isSidebarShow,
  };
}

export const sidebar = [
  { icon: 'ri-asterisk', id: '', label: 'Tous' },
  { icon: 'ri-time-line', id: 'En attente', label: 'En attente' },
  { icon: 'ri-loader-2-line', id: 'En cours', label: 'En cours' },
  { icon: 'ri-checkbox-circle-line', id: 'Terminée', label: 'Terminée' },
  { icon: 'ri-close-circle-line', id: 'Fermée', label: 'Fermée' },
];

export const headValues = ['Numéro', 'Créé', 'Statut', 'Contacts', 'Service'];

export const more = [
  {
    id: 'En attente',
    label: 'En attente',
    className: 'move',
    icon: 'ri-time-line',
  },
  {
    id: 'Terminée',
    label: 'Terminée',
    className: 'rename',
    icon: 'ri-checkbox-circle-line',
  },
  {
    id: 'Fermée',
    label: 'Fermée',
    className: 'delete',
    icon: 'ri-close-circle-line',
  },
];

export const header = [
  {
    id: 'En attente',
    label: 'En attente',
    icon: 'ri-time-line',
    isDown: true,
    value: '0.7%',
    count: 1,
    info: 'depuis la semaine dernière',
  },
  {
    id: 'En cours',
    label: 'En cours',
    icon: 'ri-loader-2-line',
    isDown: false,
    value: '0.6%',
    count: 2,
    info: 'depuis la semaine dernière',
  },
  {
    id: 'Terminée',
    label: 'Terminée',
    icon: 'ri-checkbox-circle-line',
    isDown: false,
    value: '0.6%',
    count: 3,
    info: 'depuis la semaine dernière',
  },
  {
    id: 'Fermée',
    label: 'Fermée',
    icon: 'ri-close-circle-line',
    isDown: false,
    value: '0.6%',
    count: 4,
    info: 'depuis la semaine dernière',
  },
];
