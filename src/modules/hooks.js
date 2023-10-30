import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createEventHandlerMutatorShallow,
  getValue,
  useBrainStack,
} from '../App';
import { countByProp } from '../functional/objectArray';

/**String * String* Object -> Object */
export function useCrud(route, domain, defaultModel) {
  useEffect(() => {
    document.body.classList.add('page-app');
    return () => {
      document.body.classList.remove('page-app');
    };
  }, []);

  const bstack = useBrainStack();
  const navigate = useNavigate();

  const { search, update, create, list } =
    bstack.store.createCRUDObject(domain);

  const isActive = (_value) => (getValue('search') === _value ? 'active' : '');

  const statusCount = useMemo(
    () => countByProp('status')(Object.values(list())),
    [list]
  );

  const onCreate = () => {
    const c = create(defaultModel);
    navigate(`${route}/${c.id}`);
  };

  const onClickFilter = (_value) => () => {
    createEventHandlerMutatorShallow('search')(_value);
  };

  const onChangeStatus = (_value, status) => () => {
    update({ ..._value, status });
  };

  return {
    search,
    isActive,
    statusCount,
    onCreate,
    onClickFilter,
    onChangeStatus,
  };
}
