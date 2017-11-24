import { gql } from 'apollo-client-preset';
import { graphql } from 'react-apollo';

import Room from './Room';

const query = gql`
  query FetchRoom($roomId: ID!) {
    Room(id: $roomId) {
      ... Room
    }
  }
  ${Room.fragments.room}
`;

export default graphql(query, {
  options: ({ match: { params: { room: roomId } } }) => ({
    variables: { roomId },
  }),
})(Room);
