import { gql } from 'apollo-client-preset';
import { map, reject, orderBy } from 'lodash';
import React, { Component } from 'react';
import styled from 'styled-components';
import Combatant from '../Combatant';

export const CombatantListWrapper = styled.div`
  width: 500px;
  margin: 0 auto;
`;

class CombatantList extends Component {
  static defaultProps = {};
  static propTypes = {};
  state = {};

  componentDidMount() {
    this._subscribeToCombatants();
  }

  _subscribeToCombatants = () => {
    this.props.data.subscribeToMore({
      document: gql`
        subscription {
          Combatant {
            mutation
            node {
              id
              name
              initiative
              turnOver
            }
            previousValues {
              id
            }
          }
        }
      `,
      updateQuery: (previous, response) => {
        console.log('CombatantList _subscribeToCombatants update:');
        console.log('previous: \n', previous);
        console.log('response: \n', response);

        const {
          subscriptionData: {
            data: { Combatant: { mutation, node: Combatant, previousValues } },
          },
        } = response;

        switch (mutation) {
          case 'CREATED':
            return {
              ...previous,
              allCombatants: [...previous.allCombatants, Combatant],
            };
          case 'DELETED':
            return {
              ...previous,
              allCombatants: reject(previous.allCombatants, {
                id: previousValues.id,
              }),
            };
          case 'UPDATED':
            return {
              ...previous,
              allCombatants: map(
                previous.allCombatants,
                c => (c.id === Combatant.id ? Combatant : c),
              ),
            };
          default:
            console.error(`unknown mutation type ${mutation}`);
            return previous;
        }
      },
    });
  };

  render() {
    if (this.props.data && this.props.data.loading) {
      return <CombatantListWrapper>Loading</CombatantListWrapper>;
    }

    if (this.props.data && this.props.data.error) {
      return <CombatantListWrapper>Error</CombatantListWrapper>;
    }

    return (
      <CombatantListWrapper>
        {map(
          orderBy(this.props.data.allCombatants, ['initiative'], ['desc']),
          combatant => <Combatant key={combatant.id} combatant={combatant} />,
        )}
      </CombatantListWrapper>
    );
  }
}

export default CombatantList;
