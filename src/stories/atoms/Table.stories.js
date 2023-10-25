import Table from '../../components/atoms/Table';

const headValues = ['Numéro', 'Créé', 'Statut', 'Contacts', 'Service'];

export default {
  title: 'Atoms/Table',
  component: Table,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    header: Array,
  },
  args: {
    header: headValues,
  },
};

export const Default = {
  args: {},
};
