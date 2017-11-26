import React from 'react';

import PropTypes from 'prop-types';

const AddCombatant = ({
  updateNewCombatant,
  newCombatantState: { name, initiative },
  newCombatantRequest,
}) => (
  <div>
    <input
      value={name}
      onChange={({ target: { value } }) => updateNewCombatant({ name: value })}
      type="text"
    />
    <input
      value={initiative}
      onChange={({ target: { value } }) => updateNewCombatant({ initiative: parseInt(value, 10) })}
      type="number"
    />
    <input type="submit" onClick={newCombatantRequest} value="Add Combatant" />
  </div>
);

AddCombatant.propTypes = {
  updateNewCombatant: PropTypes.func.isRequired,
  newCombatantRequest: PropTypes.func.isRequired,
  newCombatantState: PropTypes.shape({
    name: PropTypes.string,
    initiative: PropTypes.number,
  }).isRequired,
  room: PropTypes.string,
};

export default AddCombatant;
