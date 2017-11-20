import { gql } from 'apollo-client-preset';
import { graphql } from 'react-apollo';
import { compose } from 'react-apollo';
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

const deleteCombatantQuery = gql`
  mutation deleteCombatantMutation($id: ID!) {
    deleteCombatant(id: $id) {
      id
    }
  }
`;

export default compose(
  graphql(updateCombatantQuery, {
    props: ({ ownProps, mutate }) => ({
      updateCombatant: Combatant => {
        return mutate({
          variables: { ...Combatant },
          optimisticResponse: {
            __typename: 'Mutation',
            updateCombatant: {
              __typename: 'Combatant',
              ...Combatant,
            },
          },
        });
      },
    }),
  }),
  graphql(deleteCombatantQuery, {
    props: ({ ownProps, mutate }) => ({
      deleteCombatant: () =>
        mutate({
          variables: { id: ownProps.combatant.id },
        }),
    }),
  }),
)(Combatant);
