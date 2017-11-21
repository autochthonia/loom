import { map, get, orderBy, head } from 'lodash';
import React, { Component } from 'react';
import styled from 'styled-components';

import ActiveCombatant from '../ActiveCombatant';
import Combatant from '../Combatant';
import mergeSorted from '../../utilities/mergeSorted';

export const CombatantListWrapper = styled.div`
  width: 500px;
  margin: 0 auto;
`;

class CombatantList extends Component {
  static defaultProps = {};
  static propTypes = {};
  state = {
    sortedCombatants: get(this.props, 'data.allCombatants', []),
  };

  componentDidMount() {
    this.props.subscribeToCombatantUpdates();
  }

  componentWillReceiveProps(nextProps) {
    console.warn(
      'CombatantList componentWillReceiveProps - has allCombatants changed?',
    );
    this.setState({
      sortedCombatants: mergeSorted(
        this.state.sortedCombatants,
        get(nextProps, 'data.allCombatants', []),
      ),
    });
  }

  getSortedCombatants = () =>
    orderBy(this.state.sortedCombatants, ['initiative'], ['desc']);

  render() {
    console.debug('CombatantList props:\n', this.props);
    if (this.props.data && this.props.data.loading) {
      return <CombatantListWrapper>Loading</CombatantListWrapper>;
    }

    if (this.props.data && this.props.data.error) {
      return <CombatantListWrapper>Error</CombatantListWrapper>;
    }

    return (
      <CombatantListWrapper>
        <ActiveCombatant activeCombatant={head(this.getSortedCombatants())} />
        {map(this.state.sortedCombatants, combatant => (
          <Combatant key={combatant.id} combatant={combatant} />
        ))}
        <button
          onClick={() =>
            this.setState({
              sortedCombatants: this.getSortedCombatants(),
            })
          }
        >
          Sort Combatants
        </button>
      </CombatantListWrapper>
    );
  }
}

export default CombatantList;
