import { gql } from 'apollo-client-preset';
import { graphql } from 'react-apollo';

import Room from './Room';

const query = gql`
  query CurrentUserForLayout($roomId: ID!) {
    Room(id: $roomId) {
      id
      owner {
        id
      }
      players {
        id
      }
      turn
    }
  }
`;

export default graphql(query, {
  options: ({ match: { params: { room: roomId } } }) => ({
    variables: { roomId },
  }),
})(Room);
