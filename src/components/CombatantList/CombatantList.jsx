import { map, get, orderBy, head, reject } from 'lodash';
import FlipMove from 'react-flip-move';
import React, { Component } from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';

import ActiveCombatant from '../ActiveCombatant';
import AddCombatant from '../AddCombatant';
import Combatant from '../Combatant';
import mergeSorted from '../../utilities/mergeSorted';

export const CombatantListWrapper = styled.div`
  width: 500px;
  margin: 0 auto;
`;

class CombatantList extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        room: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };
  static defaultProps = {};
  state = {
    sortedCombatants: get(this.props, 'data.Room.combatants', []),
  };

  componentDidMount() {
    this.props.subscribeToCombatantUpdates();
  }

  componentWillReceiveProps(nextProps) {
    console.warn(
      'CombatantList componentWillReceiveProps - has Room.combatants changed?',
    );
    if (this.props.turn !== nextProps.turn) {
      console.debug('Room detected turn change');
    }
    const mergedCombatants = mergeSorted(
      this.state.sortedCombatants,
      get(nextProps, 'data.Room.combatants', []),
    );
    this.setState({
      sortedCombatants:
        this.props.turn !== nextProps.turn
          ? this.getSortedCombatants(mergedCombatants)
          : mergedCombatants,
    });
  }

  getSortedCombatants = (combatants = this.state.sortedCombatants) =>
    orderBy(combatants, ['initiative'], ['desc']);

  render() {
    console.debug('CombatantList props:\n', this.props);
    if (this.props.data && this.props.data.loading) {
      return <CombatantListWrapper>Loading</CombatantListWrapper>;
    }

    if (this.props.data && this.props.data.error) {
      return <CombatantListWrapper>Error</CombatantListWrapper>;
    }

    const sortedCombatants = this.getSortedCombatants();
    const activeSortedCombatants = reject(sortedCombatants, { turnOver: true });
    let isCombatantStateOrdered = true;

    try {
      isCombatantStateOrdered = this.state.sortedCombatants.every(
        ({ initiative }, i, arr) =>
          i === 0 || initiative <= arr[i - 1].initiative,
      );
    } catch (e) {
      console.error('Could not determine if combatant state is ordered:\n', e);
    }

    return (
      <CombatantListWrapper>
        <ActiveCombatant activeCombatant={head(activeSortedCombatants)} />
        <FlipMove duration={400} easing="ease-in-out" staggerDelayBy={300}>
          {map(this.state.sortedCombatants, combatant => (
            <Combatant
              key={combatant.id}
              combatant={combatant}
              active={head(activeSortedCombatants) === combatant}
            />
          ))}
        </FlipMove>

        <button
          onClick={() =>
            this.setState({
              sortedCombatants: this.getSortedCombatants(),
            })
          }
          disabled={isCombatantStateOrdered}
        >
          Sort Combatants
        </button>
        <AddCombatant />
      </CombatantListWrapper>
    );
  }
}

export default CombatantList;
