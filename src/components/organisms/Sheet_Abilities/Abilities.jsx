import React from 'react';
import styled from 'styled-components';
import * as t from 'styled-components-mixins/tachyons';

import PropTypes from 'prop-types';

import { Caption } from '../../atoms/Type';
import DotscaleGrid from '../../molecules/DotscaleGrid';

const AbilitiesWrapper = styled.div``;
const Ability = styled(DotscaleGrid)`
  ${t.pa1};
`;

const Abilities = ({ abilities, ...rest }) => (
  <AbilitiesWrapper {...rest}>
    <Caption>Abilities</Caption>
    <Ability items={abilities} />
  </AbilitiesWrapper>
);

Abilities.propTypes = {
  abilities: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, score: PropTypes.number }),
  ).isRequired,
};

export default Abilities;
