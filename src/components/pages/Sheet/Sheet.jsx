import { random } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import * as t from 'styled-components-mixins/tachyons';

import { ABILITIES, ATTRIBUTE_GROUPS } from '../../../store/Sheet/constants';
import { Row } from '../../atoms/Layout';
import AbilitiesComponent from '../../organisms/Sheet_Abilities/Abilities';
import Attributes from '../../organisms/Sheet_Attributes/Attributes';
import MeritsComponent from '../../organisms/Sheet_Merits/Merits';

const Sheet = styled.div``;
const AttributeGroup = styled.div`
  ${t.w_100};
`;
const Abilities = styled(AbilitiesComponent)``;
const Merits = styled(MeritsComponent)``;

const SheetView = props => (
  <Sheet>
    <Attributes
      attributes={ATTRIBUTE_GROUPS.map(group =>
        group.map(label => ({ label, score: random(1, 5) })),
      )}
    />
    <Row columns={[4, 4]}>
      <Abilities
        abilities={ABILITIES.map(label => ({ label, score: random(5) }))}
      />
      <Merits />
    </Row>
  </Sheet>
);

SheetView.propTypes = {};

export default SheetView;
