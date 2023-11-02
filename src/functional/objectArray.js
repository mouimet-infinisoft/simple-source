/**String -> [Object] -> Number */
export const countByProp = (prop) => (objects) =>
  objects.reduce((acc, val) => {
    acc[val[prop]] = (acc[val[prop]] || 0) + 1;
    return acc;
  }, {});
