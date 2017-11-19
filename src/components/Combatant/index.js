import { gql } from 'apollo-client-preset';
import { graphql } from 'react-apollo';

import Combatant from './Combatant';

const query = gql`
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

export default graphql(query)(Combatant);
