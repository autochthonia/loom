import { compose, lifecycle, mapProps, withStateHandlers } from 'recompose';
import { get, map, merge, reject, orderBy, head } from 'lodash';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router';
import gql from 'graphql-tag';

import Combatant from '../Combatant/Combatant';
import CombatantList from './CombatantList';
import mergeSorted from '../../utilities/mergeSorted';

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

export default compose(
  withRouter,
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
  }),
  withStateHandlers(
    props => ({
      combatantState: get(props, 'data.Room.combatants', []),
    }),
    {
      sortCombatants: ({ combatantState }) => () => ({
        combatantState: orderBy(combatantState, ['initiative'], ['desc']),
      }),
    },
  ),
  lifecycle({
    componentDidMount() {
      this.props.subscribeToCombatantUpdates();
    },
    componentWillReceiveProps(nextProps) {
      console.warn(
        'CombatantList componentWillReceiveProps - has Room.combatants changed?',
      );
      if (this.props.turn !== nextProps.turn) {
        console.debug('Room detected turn change');
      }
      const mergedCombatants = mergeSorted(
        this.props.combatantState,
        get(nextProps, 'data.Room.combatants', []),
      );
      this.setState({
        combatantState:
          this.props.turn !== nextProps.turn
            ? this.props.getSortedCombatants(mergedCombatants)
            : mergedCombatants,
      });
    },
  }),
  mapProps(props => {
    console.log(props);
    const {
      sortCombatants,
      combatantState,
      match: { params: { roomId } },
    } = props;
    let isCombatantStateOrdered = true;
    try {
      isCombatantStateOrdered = props.combatantState.every(
        ({ initiative }, i, arr) =>
          i === 0 || initiative <= arr[i - 1].initiative,
      );
    } catch (e) {
      console.error('Could not determine if combatant state is ordered:\n', e);
    }
    return {
      roomId,
      combatants: combatantState,
      isCombatantStateOrdered,
      sortCombatants,
      activeCombatant: head(
        orderBy(
          reject(combatantState, { turnOver: true }),
          ['initiative'],
          ['desc'],
        ),
      ),
    };
  }),
)(CombatantList);

// getSortedCombatants = (combatants = this.state.sortedCombatants) =>
//   orderBy(combatants, ['initiative'], ['desc']);
