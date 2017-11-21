import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const ActiveCombatantWrapper = styled.div``;

const ActiveCombatant = ({ activeCombatant: { name } }) => (
  <ActiveCombatantWrapper>{name}</ActiveCombatantWrapper>
);

ActiveCombatant.propTypes = {
  activeCombatant: PropTypes.string,
};

export default ActiveCombatant;
