import { graphql } from 'react-apollo';
import { map, reject } from 'lodash';
import gql from 'graphql-tag';

import CombatantList from './CombatantList';

const query = gql`
  {
    allCombatants {
      id
      name
      turnOver
      initiative
    }
  }
`;

const subscription = gql`
  subscription {
    Combatant {
      mutation
      node {
        id
        name
        initiative
        turnOver
      }
      previousValues {
        id
      }
    }
  }
`;

export default graphql(query, {
  props: props => {
    const { data, data: { subscribeToMore }, ownProps } = props;
    return {
      ...ownProps,
      data,
      subscribeToCombatantUpdates: () =>
        subscribeToMore({
          document: subscription,
          updateQuery: (previous, response) => {
            console.debug('CombatantList _subscribeToCombatants update:');
            console.debug('previous: \n', previous);
            console.debug('response: \n', response);

            const {
              subscriptionData: {
                data: {
                  Combatant: { mutation, node: Combatant, previousValues },
                },
              },
            } = response;

            switch (mutation) {
              case 'CREATED':
                return {
                  ...previous,
                  allCombatants: [...previous.allCombatants, Combatant],
                };
              case 'DELETED':
                return {
                  ...previous,
                  allCombatants: reject(previous.allCombatants, {
                    id: previousValues.id,
                  }),
                };
              case 'UPDATED':
                return {
                  ...previous,
                  allCombatants: map(
                    previous.allCombatants,
                    c => (c.id === Combatant.id ? Combatant : c),
                  ),
                };
              default:
                console.error(`unknown mutation type ${mutation}`);
                return previous;
            }
          },
        }),
    };
  },
})(CombatantList);
