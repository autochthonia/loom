import { compose, withHandlers, withState } from 'recompose';
import React from 'react';

import { storiesOf } from '@storybook/react';

import AddCombatant from './AddCombatant';

const AddCombatantWithState = compose(
  withState('newCombatantState', '_updateNewCombatantState', () => ({
    name: '',
    initiative: 0,
  })),
  withHandlers({
    updateNewCombatant: ({ newCombatantState, _updateNewCombatantState }) => payload =>
      _updateNewCombatantState({ ...newCombatantState, ...payload }),
  }),
)(AddCombatant);

storiesOf('AddCombatant', module).add('Example 1', () => <AddCombatantWithState />);
