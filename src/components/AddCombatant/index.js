import { compose, withHandlers, withState } from 'recompose';
import { gql } from 'apollo-client-preset';
import { graphql } from 'react-apollo';

import AddCombatant from './AddCombatant';

const query = gql`
  mutation createCombatantMutation(
    $name: String!
    $room: ID!
    $initiative: Int
    $turnOver: Boolean
  ) {
    createCombatant(name: $name, roomId: $room, turnOver: $turnOver, initiative: $initiative) {
      id
      room {
        id
      }
      name
      turnOver
      initiative
    }
  }
`;

export default compose(
  graphql(query),
  withState('newCombatantState', '_updateNewCombatantState', () => ({
    name: '',
    initiative: 0,
  })),
  withHandlers({
    updateNewCombatant: ({ newCombatantState, _updateNewCombatantState }) => payload => {
      _updateNewCombatantState({ ...newCombatantState, ...payload });
    },
    newCombatantRequest: ({
      newCombatantState,
      room,
      _updateNewCombatantState,
      mutate,
    }) => async () => {
      const { name, initiative } = newCombatantState;
      await mutate({
        variables: {
          room,
          name: name || '',
          initiative: parseInt(initiative, 10) || 0,
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createCombatant: {
            __typename: 'Combatant',
            name: name || '',
            initiative: parseInt(initiative, 10) || 0,
            id: -1, // temporary - how will this take multiple optimistic responses?
            turnOver: false,
            room,
          },
        },
      })
        .then(res => {
          _updateNewCombatantState({
            name: '',
            initiative: 0,
          });
        })
        .catch(e => {
          console.error(e);
        });
    },
  }),
)(AddCombatant);
