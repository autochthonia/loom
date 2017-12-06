import { compose, lifecycle, withStateHandlers } from 'recompose';
import React from 'react';

import { storiesOf, addDecorator } from '@storybook/react';

import Combatant from './Combatant';

const defaultCombatant = {
  name: 'Harmonious Jade',
  initiative: '12',
  id: 'asdfasdf13123',
  turnOver: false,
};

addDecorator(story => (
  <section style={{ width: '600px', margin: '0 auto' }}>{story()}</section>
));

const TogglingTurnOverCombatant = compose(
  withStateHandlers(
    () => ({
      combatant: defaultCombatant,
    }),
    {
      toggleTurnOver: ({ combatant }) => () => ({
        combatant: {
          ...combatant,
          turnOver: !combatant.turnOver,
        },
      }),
    },
  ),
  lifecycle({
    componentDidMount() {
      this.toggle = setInterval(() => this.props.toggleTurnOver(), 1500);
    },
    componentWillUnmount() {
      clearInterval(this.toggle);
    },
  }),
)(Combatant);

storiesOf('Combatant', module).add('Example 2', () => (
  <div>
    <article>
      <Combatant combatant={defaultCombatant} />
    </article>
    <article>
      <Combatant combatant={{ ...defaultCombatant, turnOver: true }} />
    </article>
    <article>
      <TogglingTurnOverCombatant combatant={defaultCombatant} />
    </article>
  </div>
));
