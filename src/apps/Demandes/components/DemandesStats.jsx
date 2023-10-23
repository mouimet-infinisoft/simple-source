import { useMemo } from 'react';
import Stats from '../../../components/atoms/Stats';

const header = [
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

const DemandesStats = ({list}) => {
  const statusCount = useMemo(() => countStatus(list()), [list]);

  const cards = header.map((x) => {
    return { ...x, count: statusCount?.[x.id] || 0 };
  });

  return <Stats cards={cards} />;
};

export default DemandesStats;
