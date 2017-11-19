import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import CombatantList from './CombatantList';

const query = gql`
  {
    allCombatants {
      id,
      name,
      turnOver,
      initiative
    }
  }
`;

export default graphql(query)(CombatantList);
