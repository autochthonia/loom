import { gql } from 'apollo-client-preset';
import { propType } from 'graphql-anywhere';
import React, { Component } from 'react';
import styled from 'styled-components';

import TextInput, { Checkbox, NumberInput } from '../atoms/Input';

const CombatantWrapper = styled.div`
  margin: 20px auto;
  padding: 4px;
  background: ${props =>
    props.turnOver ? 'grey' : props.active ? 'gold' : 'cornflowerblue'};
  transition: background-color 0.5s ease;
`;

class Combatant extends Component {
  static fragments = {
    combatant: gql`
      fragment Combatant on Combatant {
        id
        name
        initiative
        turnOver
      }
    `,
  };
  static propTypes = {
    combatant: propType(Combatant.fragments.combatant).isRequired,
  };
  static defaultProps = {};

  _updateCombatant = async payload => {
    console.debug('!!! UPDATE COMBATANT !!!');
    const response = await this.props.updateCombatant({
      id: this.props.combatant.id,
      ...payload,
    });
    console.debug(response);
  };

  render() {
    const { active } = this.props;
    const { name, initiative, id, turnOver } = this.props.combatant;
    const Wrapper = CombatantWrapper;
    return (
      <Wrapper turnOver={turnOver} active={active}>
        <Checkbox
          checked={turnOver}
          onChange={() =>
            this._updateCombatant({
              turnOver: !this.props.combatant.turnOver,
            })
          }
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
      </Wrapper>
    );
  }
}

export default Combatant;
