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
    createCombatant(
      name: $name
      roomId: $room
      turnOver: $turnOver
      initiative: $initiative
    ) {
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

// TODO: addCombatant optimisticResponse
export default graphql(query)(AddCombatant);
