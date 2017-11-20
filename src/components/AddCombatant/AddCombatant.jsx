import { gql } from 'apollo-client-preset';
import React, { Component } from 'react';
import { map } from 'lodash';

class CombatantList extends Component {
  static defaultProps = {};
  static propTypes = {};
  state = {
    name: '',
    initiative: 0,
  };

  _createCombatant = async () => {
    const { name = '', initiative = 0 } = this.state;
    await this.props
      .mutate({
        variables: {
          name: name || '',
          initiative: parseInt(initiative, 10) || 0,
        },
      })
      .then(res => {
        console.log(res);
        this.setState({
          name: '',
          initiative: 0,
        });
      })
      .catch(e => {
        console.error(e);
      });
  };

  render() {
    console.log(this.props);
    if (this.props.data && this.props.data.loading) {
      return <div>Loading</div>;
    }

    if (this.props.data && this.props.data.error) {
      return <div>Error</div>;
    }

    return (
      <div>
        <input
          value={this.state.name}
          onChange={({ target: { value } }) => this.setState({ name: value })}
          type="text"
        />
        <input
          value={this.state.initiative}
          onChange={({ target: { value } }) =>
            this.setState({ initiative: value })
          }
          type="number"
        />
        <input
          type="submit"
          onClick={this._createCombatant}
          value="Add Combatant"
        />
      </div>
    );
  }
}

export default CombatantList;
