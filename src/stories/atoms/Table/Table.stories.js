import Table from '../../../components/atoms/Table';
import { demandesList } from './mock';
import { MockLink } from '../../StorybookComponents';

const headValues = ['Numéro', 'Créé', 'Statut', 'Contacts', 'Service'];

const items = Object.values(demandesList).map((x) => ({
  ...x,
  columns: [x.reference, x.created, x.status, 'AAA, BBB', x.service],
}));

const more = [
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

export default {
  title: 'Atoms/Table',
  component: Table,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    header: Array,
    route: String,
    items: Array,
    onChangeStatus: Function,
  },
  args: {
    header: headValues,
    route: '/app/demandes/',
    Link: MockLink,
    items: items,
    moreContext: more,
    onChangeStatus: () => {},
  },
};

export const Default = {
  args: {},
};
