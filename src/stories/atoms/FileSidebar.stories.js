import FileSidebar from '../../components/atoms/FileSidebar';

const data = [
  { icon: 'ri-asterisk', id: '', label: 'Tous' },
  { icon: 'ri-time-line', id: 'En attente', label: 'En attente' },
  { icon: 'ri-loader-2-line', id: 'En cours', label: 'En cours' },
  { icon: 'ri-checkbox-circle-line', id: 'Terminée', label: 'Terminée' },
  { icon: 'ri-close-circle-line', id: 'Fermée', label: 'Fermée' },
];

export default {
  title: 'Atoms/FileSidebar',
  component: FileSidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    links: Array,
    filterLabel: String,
    buttonCreateLabel: String,
    isActive: Function,
    onClickFilter: Function,
    onCreate: Function,
  },
  args: {
    links: [...data],
    filterLabel: 'Filtres',
    buttonCreateLabel: 'Nouvelle',
  },
};

export const Default = {
  args: {},
};
