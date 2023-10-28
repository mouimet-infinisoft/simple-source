import Stats from '../../components/atoms/Stats';

const data = [
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

export default {
  title: 'Atoms/Stats',
  component: Stats,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    cards: Array,
  },
  args: {
    cards: data,
  },
};

export const Default = {
  args: {},
};
