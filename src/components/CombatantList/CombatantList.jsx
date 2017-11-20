import { map, get, orderBy } from 'lodash';
import React, { Component } from 'react';
import styled from 'styled-components';

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

  componentWillReceiveProps({ data: { allCombatants = [] } = {} } = {}) {
    this.setState({
      sortedCombatants: mergeSorted(this.state.sortedCombatants, allCombatants),
    });
  }

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
        {map(this.state.sortedCombatants, combatant => (
          <Combatant key={combatant.id} combatant={combatant} />
        ))}
        <button
          onClick={() =>
            this.setState({
              sortedCombatants: orderBy(
                this.state.sortedCombatants,
                ['initiative'],
                ['desc'],
              ),
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
