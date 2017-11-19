import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CombatantList extends Component {
  static defaultProps = {};
  static propTypes = {};
  state = {};

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
            <div>
              {id} {name} {initiative} {turnOver}
            </div>
          ),
        )}
      </div>
    );
  }
}

export default CombatantList;
