import { propType } from 'graphql-anywhere';
import React from 'react';
import styled from 'styled-components';

import Combatant from '../Combatant';

export const ActiveCombatantWrapper = styled.div``;

const ActiveCombatant = ({ activeCombatant: { name } }) => (
  <ActiveCombatantWrapper>Active Combatant: {name}</ActiveCombatantWrapper>
);

ActiveCombatant.propTypes = {
  activeCombatant: propType(Combatant.fragments.combatant),
};

export default ActiveCombatant;
