import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createEventHandlerMutatorShallow,
  getValue,
  useBrainStack,
} from '../../../App';
import { defaultModel } from '../assets/datamock';

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

function countStatus(demandes) {
  return Object.values(demandes).reduce((acc, demande) => {
    acc[demande.status] = (acc[demande.status] || 0) + 1;
    return acc;
  }, {});
}

export function useDemandsList() {
  const bstack = useBrainStack();
  const navigate = useNavigate();
  const { search, update, create, list } =
    bstack.store.createCRUDObject('demandes');

  useEffect(() => {
    document.body.classList.add('page-app');
    return () => {
      document.body.classList.remove('page-app');
    };
  }, []);

  // toggle sidebar in mobile
  const [isSidebarShow, setSidebarShow] = useState(false);

  const isActive = (_value) => (getValue('search') === _value ? 'active' : '');

  const onClickFilter = (_value) => () => {
    createEventHandlerMutatorShallow('search')(_value);
  };

  const onChangeStatus = (_value, status) => () => {
    update({ ..._value, status });
  };

  const statusCount = useMemo(() => countStatus(list()), [list]);

  const onCreate = () => {
    const c = create(defaultModel());
    navigate(`/apps/demandes/${c.id}`);
  };

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
    items,
    statusCount,
    isSidebarShow,
    search,
    onClickFilter,
    onCreate,
    onChangeStatus,
    isActive,
  };
}
