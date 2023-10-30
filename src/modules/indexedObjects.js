/**IndexObject
 * Object having index fields and values as object where value
 * has id == index value
 * { a: {id: 'a', ....},
 *   b: {id: 'b', ....},
 * }
 */

import { useMemo } from 'react';
import { countByProp } from '../functional/objectArray';

/**String -> IndexObject */
export const countByPropMemo = (prop) => (indexObject) =>
  useMemo(() => countByProp(prop)(Object.values(indexObject)), [indexObject]);
