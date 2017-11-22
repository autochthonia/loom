import { gql } from 'apollo-client-preset';
import { graphql } from 'react-apollo';

import Combatant from '../Combatant';
import Room from './Room';

const query = gql`
  query FetchRoom($roomId: ID!) {
    Room(id: $roomId) {
      id
      owner {
        id
      }
      players {
        id
      }
      combatants {
        ... Combatant
      }
      turn
    }
  }
  ${Combatant.fragments.combatant}
`;

export default graphql(query, {
  options: ({ match: { params: { room: roomId } } }) => ({
    variables: { roomId },
  }),
})(Room);
