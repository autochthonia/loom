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
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: null,
      initiative: null,
      turnOver: null,
      updates: 0,
      ...props.combatant,
    };
    this.debounce = debounce(payload => {
      console.log(payload);
      return this._updateCombatant(payload);
    }, 4000);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.combatant !== this.props.combatant) {
      console.log(`combatant ${this.props.combatant.id} updated`);
      this.setState({
        ...nextProps.combatant,
      });
    }
  }

  _debounceCombatantUpdates = payload => {
    this.setState(
      {
        ...payload,
        updates: this.state.updates + 1,
      },
      () => {
        try {
          this.debounce(this.state);
        } catch (e) {
          console.error(e);
        }
      },
    );
  };

  _updateCombatant = async payload => {
    console.log('!!! UPDATE COMBATANT !!!');
    const response = await this.props.mutate({
      variables: {
        ...this.props.combatant,
        ...payload,
      },
    });
    // console.log(response);
  };

  render() {
    const { name, initiative, id, turnOver } = this.state;
    return (
      <CombatantWrapper>
        <Checkbox
          checked={turnOver}
          onChange={() =>
            this._debounceCombatantUpdates({
              turnOver: !this.props.combatant.turnOver,
            })
          }
        />
        <NumberInput
          value={initiative}
          onChange={({ target: { value } }) =>
            this._debounceCombatantUpdates({
              initiative: parseInt(value, 10),
            })
          }
        />
        -
        <TextInput
          value={name}
          onChange={({ target: { value } }) =>
            this._debounceCombatantUpdates({
              name: value,
            })
          }
        />
      </CombatantWrapper>
    );
  }
}

export default Combatant;
