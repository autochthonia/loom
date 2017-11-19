import { gql } from 'apollo-client-preset';
import { graphql } from 'react-apollo';

import AddCombatant from './AddCombatant';

const query = gql`
  mutation createCombatantMutation(
    $initiative: Int
    $name: String!
    $turnOver: Boolean
  ) {
    createCombatant(
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

export default graphql(query)(AddCombatant);
