import { find } from 'lodash';

import mergeSorted from './mergeSorted';

const generateNode = ({ id = Math.floor(Math.random() * 1000) }) => ({
  id,
  random: `${Math.floor(Math.random() * 100000)}`,
});

describe('mergeSorted', () => {
  it('updates by id', () => {
    const stale = generateNode({ id: 1 });
    const fresh = generateNode({ id: 1 });
    expect(mergeSorted([stale], [fresh])).toEqual([fresh]);
  });
  it('appends new nodes', () => {
    const stale = [generateNode({ id: 1 })];
    const fresh = [generateNode({ id: 1 }), generateNode({ id: 2 })];
    expect(mergeSorted(stale, fresh)).toEqual(fresh);
  });
  it('preserves order', () => {
    const stale = [generateNode({ id: 1 }), generateNode({ id: 2 })];
    const fresh = [generateNode({ id: 2 }), generateNode({ id: 1 })];
    expect(mergeSorted(stale, fresh)).toEqual(
      stale.map(({ id }) => find(fresh, { id })),
    );
  });
  it('removes old data', () => {
    const stale = [generateNode({ id: 1 }), generateNode({ id: 2 })];
    const fresh = [generateNode({ id: 1 })];
    expect(mergeSorted(stale, fresh)).toEqual(fresh);
  });
  it('does all of the above', () => {
    const stale = [
      generateNode({ id: 1 }),
      generateNode({ id: 2 }),
      generateNode({ id: 3 }),
      generateNode({ id: 4 }),
      generateNode({ id: 5 }),
    ];
    const fresh = [
      generateNode({ id: 7 }),
      generateNode({ id: 4 }),
      generateNode({ id: 6 }),
      generateNode({ id: 5 }),
      generateNode({ id: 3 }),
    ];
    expect(mergeSorted(stale, fresh)).toEqual([
      fresh[4],
      fresh[1],
      fresh[3],
      fresh[0],
      fresh[2],
    ]);
  });
});
