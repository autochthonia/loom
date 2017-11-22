import { withRouter } from 'react-router';
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Load from '../../utilities/Load';

class TurnInfo extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        room: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    data: PropTypes.shape({
      Room: PropTypes.shape({
        turn: PropTypes.number.isRequired,
      }),
    }),
  };
  static defaultProps = {};

  componentDidMount() {
    this.props.subscribeToTurnUpdates();
  }

  _advanceTurn = async () => {
    await this.props
      .mutate({
        variables: {
          turn: this.props.data.Room.turn + 1,
        },
      })
      .catch(e => {
        console.error(e);
      });
  };

  render() {
    console.log(this.props);
    console.log(this.props.data);
    return (
      <Load data={this.props.data}>
        <div>
          <span>Turn: </span>
          <span>{this.props.data.Room.turn}</span>
        </div>
        <button onClick={this._advanceTurn}>Next Turn</button>
      </Load>
    );
  }
}

export default withRouter(TurnInfo);
