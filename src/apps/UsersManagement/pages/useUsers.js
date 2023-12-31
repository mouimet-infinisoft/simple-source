import { v4 as uuidv4 } from 'uuid';
import { getValue } from '../../../App';
import { useCrud } from '../../../modules/hooks';

const defaultModel = () => ({
  id: uuidv4(),
  employeeID: 'E00' + (Object.keys(getValue('users'))?.length + 1 ?? 1),
  name: '',
  department: '',
  status: 'Activé',
  role: '',
  email: '',
  contactNumber: '',
  hireDate: '2021-01-10',
  address: '',
  emergencyContact: {
    name: '',
    relation: '',
    contactNumber: '',
  },
});

export function useUsers() {
  const crud = useCrud('/apps/staff', 'users', defaultModel());

  const items = crud.searchItems((x) => {
    return {
      ...x,
      icon: 'ri-team-fill',
      columns: [
        x.employeeID,
        x.name,
        x.department,
        x.role,
        x.email,
        x.contactNumber,
      ],
    };
  });

  return {
    ...crud,
    items,
  };
}

export const sidebar = [
  { icon: 'ri-asterisk', id: '', label: 'Tous' },
  { icon: 'ri-checkbox-circle-line', id: 'Activé', label: 'Activé' },
  { icon: 'ri-close-circle-line', id: 'Désactivé', label: 'Désactivé' },
];

export const header = [
  {
    id: 'Activé',
    label: 'Activé',
    icon: 'ri-checkbox-circle-line',
    isDown: true,
    value: '0.7%',
    count: 3,
    info: 'depuis la semaine dernière',
  },
  {
    id: 'Désactivé',
    label: 'Désactivé',
    icon: 'ri-close-circle-line',
    isDown: false,
    value: '0.6%',
    count: 4,
    info: 'depuis la semaine dernière',
  },
];

export const headValues = ['Numéro', 'Nom', 'Rôle', 'E-mail', 'Contact Nr.'];

export const more = [
  {
    id: 'Activé',
    label: 'Activé',
    className: 'rename',
    icon: 'ri-checkbox-circle-line',
  },
  {
    id: 'Désactivé',
    label: 'Désactivé',
    className: 'delete',
    icon: 'ri-close-circle-line',
  },
];
