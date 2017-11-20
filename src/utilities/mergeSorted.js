import { intersectionBy, differenceBy, compact, find } from 'lodash';

export default (stale, fresh) => {
  const updatedNodes = intersectionBy(fresh, stale, 'id');
  const newNodes = differenceBy(fresh, stale, 'id');
  return compact(stale.map(({ id }) => find(updatedNodes, { id }))).concat(
    newNodes,
  );
};
