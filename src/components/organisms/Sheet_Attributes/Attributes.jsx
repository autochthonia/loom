import React from 'react';
import styled from 'styled-components';
import * as t from 'styled-components-mixins/tachyons';

import PropTypes from 'prop-types';

import { Caption } from '../../atoms/Type';
import DotscaleGrid from '../../molecules/DotscaleGrid';

const AttributesWrapper = styled.div``;
const AttributeGrid = styled(DotscaleGrid)`
  ${t.inline_flex};
  ${t.flex_column};
  ${t.w_33};
`;

const Attributes = ({ attributes, ...rest }) => (
  <AttributesWrapper {...rest}>
    <Caption>Attributes</Caption>
    {attributes.map(group => <AttributeGrid items={group} />)}
  </AttributesWrapper>
);

Attributes.propTypes = {
  attributes: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, score: PropTypes.number }),
  ).isRequired,
};

export default Attributes;
