import { v4 as uuidv4 } from 'uuid';
import { core } from '../App';
import { capitalizeFirstLetter } from '../functional/strings';

export const crudSDK = (domain, model) => {
  const domainName = capitalizeFirstLetter(domain);

  const domainOrDefault = s => (s && s[domain]) ?? [];

  const coreGet = () => core?.store?.getState(domainOrDefault) || [];

  const withIndex = (index, obj, effectFn) => {
    if (index < 0) {
      throw new Error(`${domainName} with ID ${obj.id} not found.`);
    } else {
      effectFn();
    }
  };

  const validateId = obj => {
    if (!obj.id) {
      throw new Error(`${domainName} object must have an 'id' property.`);
    }
  };

  return (_list = []) => {
    core?.store?.mutate(s => ({ ...s, [domain]: _list }));

    /**void -> [] */
    const list = coreGet;

    /**{Object} -> {Object} */
    function create(model) {
      const obj = {
        ...model,
        id: uuidv4(),
      };

      core?.store?.mutate(s => ({
        ...s,
        [domain]: [...domainOrDefault(s), obj],
      }));

      return obj;
    }

    /**{...Object, id} -> void */
    function update(objectToUpdate) {
      validateId(objectToUpdate);

      const list = coreGet();

      const index = list.findIndex(x => x.id === objectToUpdate.id);

      withIndex(index, objectToUpdate, () => {
        list[index] = { ...list[index], ...objectToUpdate };
        core?.store?.mutate(s => ({ ...s, [domain]: list }));
      });
    }

    /**{...Object, id} -> void */
    function trash(objectToDelete) {
      validateId(objectToDelete);

      const list = coreGet();

      const index = list.findIndex(x => x.id === objectToDelete.id);

      withIndex(index, objectToDelete, () => {
        list.splice(index, 1);
        core?.store?.mutate(s => ({ ...s, [domain]: list }));
      });
    }

    return {
      list,
      create,
      update,
      trash,
    };
  };
};
