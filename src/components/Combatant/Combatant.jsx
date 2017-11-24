import { gql } from 'apollo-client-preset';
import { noop } from 'lodash';
import { propType } from 'graphql-anywhere';
import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';

import TextInput, { Checkbox, NumberInput } from '../atoms/Input';

const CombatantWrapper = styled.div`
  margin: 20px auto;
  padding: 4px;
  background: ${props =>
    props.turnOver ? 'grey' : props.active ? 'gold' : 'cornflowerblue'};
  transition: background-color 0.5s ease;
`;

/**
 * Displays a Combatant
 * @param   {Boolean}   active          Combatant has highest init in combat and !turnOver
 * @param   {Object}    combatant       Combatant object from database
 * @param   {ID}        id              GraphQL ID
 * @param   {Number}    initiative      Initiative count, can be negative
 * @param   {Boolean}   turnOver        Whether Combatant has already acted this turn
 * @param   {Function}  updateCombatant Handler to update a field on this combatant
 * @param   {Function}  deleteCombatant Handler to delete this combatant
 * @returns {Component}                 Returns component to be enhanced
 */
const Combatant = ({
  active,
  combatant: { name, initiative, id, turnOver },
  updateCombatant,
  deleteCombatant,
}) => (
  <CombatantWrapper turnOver={turnOver} active={active}>
    <Checkbox
      checked={turnOver}
      onChange={() =>
        updateCombatant({
          turnOver: !turnOver,
        })
      }
    />
    <NumberInput
      value={initiative}
      onChange={({ target: { value } }) =>
        updateCombatant({
          initiative: parseInt(value, 10) || 0,
        })
      }
    />
    -
    <TextInput
      value={name}
      onChange={({ target: { value } }) =>
        updateCombatant({
          name: value,
        })
      }
    />
    <button onClick={deleteCombatant}>X</button>
  </CombatantWrapper>
);

Combatant.fragments = {
  combatant: gql`
    fragment Combatant on Combatant {
      id
      name
      initiative
      turnOver
    }
  `,
};
Combatant.propTypes = {
  combatant: propType(Combatant.fragments.combatant).isRequired,
  active: PropTypes.bool,
  updateCombatant: PropTypes.func,
  deleteCombatant: PropTypes.func,
};
Combatant.defaultProps = {
  active: false,
  updateCombatant: noop,
  deleteCombatant: noop,
};

export default Combatant;
