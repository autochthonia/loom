import { gql } from 'apollo-client-preset';
import React, { Component } from 'react';
import { map, reject } from 'lodash';

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
      return <div>Loading</div>;
    }

    if (this.props.data && this.props.data.error) {
      return <div>Error</div>;
    }

    return (
      <div>
        {this.props.data.allCombatants.map(
          ({ id, name, initiative, turnOver }) => (
            <div key={id}>
              <input type="checkbox" checked={turnOver} /> {name} {initiative}
            </div>
          ),
        )}
      </div>
    );
  }
}

export default CombatantList;
