import { graphql } from 'react-apollo';
import { map, reject, merge } from 'lodash';
import { withRouter } from 'react-router';
import gql from 'graphql-tag';

import Combatant from '../Combatant';
import CombatantList from './CombatantList';

const query = gql`
  query FetchRoom($roomId: ID!) {
    Room(id: $roomId) {
      combatants {
        ... Combatant
      }
    }
  }
  ${Combatant.fragments.combatant}
`;

const subscription = gql`
  subscription {
    Combatant {
      mutation
      node {
        ... Combatant
      }
      previousValues {
        id
      }
    }
  }
  ${Combatant.fragments.combatant}
`;

export default withRouter(
  graphql(query, {
    options: ({ match: { params: { room: roomId } } }) => ({
      variables: { roomId },
    }),
    props: props => {
      const {
        data,
        data: { subscribeToMore },
        ownProps,
        ownProps: { match: { params: { room: roomId } } },
      } = props;
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
                    Room: {
                      id: roomId,
                      ...previous.Room,
                      combatants: [...previous.Room.combatants, Combatant],
                    },
                  };
                case 'DELETED':
                  return {
                    ...previous,
                    Room: {
                      id: roomId,
                      ...previous.Room,
                      combatants: reject(previous.Room.combatants, {
                        id: previousValues.id,
                      }),
                    },
                  };
                case 'UPDATED': {
                  const body = {
                    ...previous,
                    Room: {
                      id: roomId,
                      ...previous.Room,
                      combatants: map(
                        previous.Room.combatants,
                        c =>
                          c.id === Combatant.id ? merge({}, c, Combatant) : c,
                      ),
                    },
                  };
                  console.log(body);
                  return body;
                }
                default:
                  console.error(`unknown mutation type ${mutation}`);
                  return previous;
              }
            },
          }),
      };
    },
  })(CombatantList),
);
