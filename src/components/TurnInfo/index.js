import { merge } from 'lodash';
import { compose, graphql } from 'react-apollo';
import { gql } from 'apollo-client-preset';
import { withRouter } from 'react-router';

import TurnInfo from './TurnInfo';

const query = gql`
  query {
    Room(id: $room) {
      turn
    }
  }
`;

const subscription = gql`
  subscription TurnUpdateSubscription($room: ID!) {
    Room(
      filter: {
        mutation_in: [UPDATED]
        node: { id: $room }
        updatedFields_contains: "turn"
      }
    ) {
      node {
        id
        turn
      }
    }
  }
`;

const mutation = gql`
  mutation advanceTurnMutation($room: ID!, $turn: Int!) {
    updateRoom(id: $room, turn: $turn) {
      id
      turn
    }
  }
`;

// TODO: addCombatant optimisticResponse
export default withRouter(
  compose(
    graphql(query, {
      options: ({ match: { params: { room } } }) => ({
        variables: {
          room,
        },
      }),
      props: props => {
        const {
          data,
          data: { subscribeToMore },
          ownProps,
          ownProps: { match: { params: { room } } },
        } = props;
        return {
          ...ownProps,
          data,
          subscribeToTurnUpdates: () =>
            subscribeToMore({
              document: subscription,
              variables: {
                room,
              },
              updateQuery: (previous, response) => {
                console.debug('TurnInfo _subscribeToTurnUpdates:');
                console.debug('previous: \n', previous);
                console.debug('response: \n', response);
                const {
                  subscriptionData: { data: { Room: { node } } },
                } = response;
                const body = merge({}, previous, { Room: node });
                return body;
              },
            }),
        };
      },
    }),
    graphql(mutation, {
      options: ({ match: { params: { room } } }) => ({
        variables: {
          room,
          turn: 1,
        },
      }),
    }),
  )(TurnInfo),
);
