import { compose, graphql } from 'react-apollo';
import { debounce, omit } from 'lodash';
import { gql } from 'apollo-client-preset';
import {
  mapProps,
  pure,
  withHandlers,
  withState,
  withPropsOnChange,
} from 'recompose';

import Combatant from './Combatant';

const updateCombatantQuery = gql`
  mutation updateCombatantMutation(
    $id: ID!
    $initiative: Int
    $name: String
    $turnOver: Boolean
  ) {
    updateCombatant(
      id: $id
      name: $name
      turnOver: $turnOver
      initiative: $initiative
    ) {
      id
      name
      turnOver
      initiative
    }
  }
`;

const apolloUpdateCombatant = graphql(updateCombatantQuery, {
  props: ({ ownProps, mutate }) => ({
    _updateCombatant: Combatant => {
      console.debug('UPDATING COMBATANT');
      mutate({
        variables: { ...Combatant, id: ownProps.combatant.id },
        optimisticResponse: {
          __typename: 'Mutation',
          updateCombatant: {
            __typename: 'Combatant',
            ...Combatant,
            id: ownProps.combatant.id,
          },
        },
      });
    },
  }),
});

const deleteCombatantQuery = gql`
  mutation deleteCombatantMutation($id: ID!) {
    deleteCombatant(id: $id) {
      id
    }
  }
`;

const apolloDeleteCombatant = graphql(deleteCombatantQuery, {
  props: ({ ownProps, mutate }) => ({
    deleteCombatant: () =>
      mutate({
        variables: { id: ownProps.combatant.id },
      }),
  }),
});

export default compose(
  // provide apollo mutate bindings
  apolloUpdateCombatant,
  apolloDeleteCombatant,
  // create a debounced _updateCombatant when the function changes. Seems to be re-creating
  // every time a mutate request comes back. Could it have to do with optimistic updating?
  withPropsOnChange(['_updateCombatant'], ({ _updateCombatant }) => {
    console.warn('Combatant container _updateCombatant withPropsOnChange');
    return {
      _debouncedUpdateCombatant: debounce(_updateCombatant, 1000, {
        maxWait: 4000,
      }),
    };
  }),
  // provide state for use with debouncer (holds data between debounced server requests). Bonus:
  // will automatically update upon receiving new props from apollo!
  withState('combatantState', '_updateCombatantState', ({ combatant }) => ({
    ...combatant,
  })),
  // Handler for updateCombatant that provides home-made optimistic + debounced updating.
  // Immediately updates combatantState (providing presentational component with new data) and
  // calls debounced updateCombatant from Apollo in order to send debounced network requests
  withHandlers({
    updateCombatant: ({
      _debouncedUpdateCombatant,
      _updateCombatantState,
      combatantState,
    }) => payload => {
      _updateCombatantState({ ...combatantState, ...payload });
      _debouncedUpdateCombatant({ ...combatantState, ...payload });
    },
  }),
  // cleanup - remove the private props spawned through recompose and override combatant with
  // our custom combatantState
  mapProps(props => ({
    ...omit(props, [
      '_updateCombatant',
      '_debouncedUpdateCombatant',
      '_updateCombatantState',
      'combatantState',
    ]),
    combatant: props.combatantState,
  })),
  pure,
)(Combatant);
