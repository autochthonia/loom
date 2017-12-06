import { random } from 'lodash';
import React from 'react';

import { storiesOf } from '@storybook/react';

import { ABILITIES } from '../../../store/Sheet/constants';
import Abilities from './Abilities';

storiesOf('Abilities', module).add('Basics', () => (
  <div style={{ width: '600px', margin: 'auto' }}>
    <Abilities
      abilities={ABILITIES.map(label => ({ label, score: random(5) }))}
    />
  </div>
));
