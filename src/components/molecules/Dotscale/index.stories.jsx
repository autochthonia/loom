import React from 'react';
import { storiesOf } from '@storybook/react';

import Dotscale from './';

storiesOf('Dotscale', module).add('Basics', () => (
  <div>
    <h1>Default:</h1>
    <Dotscale />
    <h1>Min 1:</h1>
    <Dotscale min={1} />
    <h1>Max 10:</h1>
    <Dotscale max={10} />
    <h1>Max 10 Min 1:</h1>
    <Dotscale max={10} min={1} />
    <h1>Value 0:</h1>
    <Dotscale value={0} />
    <h1>Value 1:</h1>
    <Dotscale value={1} />
    <h1>Value 2:</h1>
    <Dotscale value={2} />
    <h1>Value 5:</h1>
    <Dotscale value={5} />
  </div>
));
storiesOf('Dotscale', module).add('Labels', () => (
  <div>
    <h1>Default:</h1>
    <Dotscale label="Attribute"/>
  </div>
));
