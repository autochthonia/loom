import { withRouter } from 'react-router';
import React, { Component } from 'react';

import PropTypes from 'prop-types';

class AddCombatant extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        room: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };
  static defaultProps = {};
  state = {
    name: '',
    initiative: 0,
  };

  _createCombatant = async () => {
    const { name = '', initiative = 0 } = this.state;
    await this.props
      .mutate({
        variables: {
          room: this.props.match.params.room,
          name: name || '',
          initiative: parseInt(initiative, 10) || 0,
        },
      })
      .then(res => {
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

export default withRouter(AddCombatant);
