import Table from '../../../components/atoms/Table';
import { demandesList } from './mock';
import { MockLink } from '../../StorybookComponents';

const headValues = ['Numéro', 'Créé', 'Statut', 'Contacts', 'Service'];

const mock = Object.values(demandesList).map((x) => ({
  ...x,
  contacts: 'AAA, BBB',
  columns: [x.reference, x.created, x.status, 'AAA, BBB', x.service],
}));

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
  },
  args: {
    header: headValues,
    route: '/app/demandes/',
    Link: MockLink,
    items: mock,
  },
};

export const Default = {
  args: {},
};
