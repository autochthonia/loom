import { map } from 'lodash';
import { propType } from 'graphql-anywhere';
import FlipMove from 'react-flip-move';
import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';

import ActiveCombatant from '../ActiveCombatant';
import AddCombatant from '../AddCombatant';
import Combatant from '../Combatant';
import CombatantView from '../Combatant/Combatant';

export const CombatantListWrapper = styled.div`
  width: 500px;
  margin: 0 auto;
`;

const CombatantList = ({
  combatants,
  roomId,
  sortCombatants,
  isCombatantStateOrdered,
  activeCombatant,
}) => (
  <CombatantListWrapper>
    <ActiveCombatant activeCombatant={activeCombatant} />
    <FlipMove duration={400} easing="ease-in-out" staggerDelayBy={300}>
      {map(combatants, combatant => (
        <Combatant
          key={combatant.id}
          combatant={combatant}
          active={activeCombatant === combatant}
        />
      ))}
    </FlipMove>

    <button onClick={sortCombatants} disabled={isCombatantStateOrdered}>
      Sort Combatants
    </button>
    <AddCombatant room={roomId} />
  </CombatantListWrapper>
);

CombatantList.propTypes = {
  sortedCombatants: PropTypes.arrayOf(
    propType(CombatantView.fragments.combatant),
  ),
  activeCombatant: propType(CombatantView.fragments.combatant),
  roomId: PropTypes.string,
  sortCombatants: PropTypes.func,
  isCombatantStateOrdered: PropTypes.bool,
};

export default CombatantList;
