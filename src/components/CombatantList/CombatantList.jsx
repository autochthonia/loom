import { gql } from 'apollo-client-preset';
import React, { Component } from 'react';
import { map } from 'lodash';

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
            node {
              id
              name
              initiative
              turnOver
            }
          }
        }
      `,
      updateQuery: (
        previous,
        {
          subscriptionData,
          subscriptionData: { data: { Combatant } },
          ...rest
        },
      ) => {
        console.log('CombatantList _subscribeToCombatants update:');
        console.log('previous: \n', previous);
        console.log('subscriptionData: \n', { ...rest, subscriptionData });

        // replace updated combatant with new one
        // TODO: what about creation and deletion?
        // create updateResource, addResource, deleteResource helpers
        return {
          ...previous,
          allCombatants: map(
            previous.allCombatants,
            c => (c.id === Combatant.id ? Combatant : c),
          ),
        };
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
