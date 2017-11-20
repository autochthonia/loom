import { debounce } from 'lodash';
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import TextInput, { Checkbox, NumberInput } from '../atoms/Input';

const CombatantWrapper = styled.div`
  margin: 20px auto;
  padding: 4px;
  background: cornflowerblue;
`;

class Combatant extends Component {
  static propTypes = {
    combatant: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      initiative: PropTypes.number,
      turnOver: PropTypes.bool,
    }).isRequired,
  };
  static defaultProps = {};

  _updateCombatant = async payload => {
    console.debug('!!! UPDATE COMBATANT !!!');
    const response = await this.props.updateCombatant({
      ...this.props.combatant,
      ...payload,
    });
    // console.log(response);
  };

  render() {
    const { name, initiative, id, turnOver } = this.props.combatant;
    return (
      <CombatantWrapper>
        <Checkbox
          checked={turnOver}
          onChange={() => {
            console.log('clicking checkbox');
            this._updateCombatant({
              turnOver: !this.props.combatant.turnOver,
            });
          }}
        />
        <NumberInput
          value={initiative}
          onChange={({ target: { value } }) =>
            this._updateCombatant({
              initiative: parseInt(value, 10) || 0,
            })
          }
        />
        -
        <TextInput
          value={name}
          onChange={({ target: { value } }) =>
            this._updateCombatant({
              name: value,
            })
          }
        />
        <button onClick={this.props.deleteCombatant}>X</button>
      </CombatantWrapper>
    );
  }
}

export default Combatant;
