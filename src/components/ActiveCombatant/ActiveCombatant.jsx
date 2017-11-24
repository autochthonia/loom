import { propType } from 'graphql-anywhere';
import React from 'react';
import styled from 'styled-components';

import Combatant from '../Combatant/Combatant';

export const ActiveCombatantWrapper = styled.div``;

const ActiveCombatant = ({ activeCombatant: { name } = { name: 'None' } }) => (
  <ActiveCombatantWrapper>Active Combatant: {name}</ActiveCombatantWrapper>
);

ActiveCombatant.propTypes = {
  activeCombatant: propType(Combatant.fragments.combatant),
};

export default ActiveCombatant;
