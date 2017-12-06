import { times } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import * as t from 'styled-components-mixins/tachyons';

import PropTypes from 'prop-types';

import Dot from '../../atoms/Dot';

const DotscaleWrapper = styled.div`
  ${t.w_100};
  ${t.flex};
  ${t.justify_between};
  background: ${({ zebra }) => (zebra ? '#ccc' : '#fff')};
`;
const DotWrapper = styled.div`
  ${t.inline_flex};
  ${t.items_center};
  > * {
    &:not(:last-child) {
      ${t.mr1};
    }
  }
`;

const Label = styled.span``;

const Dotscale = ({ label = null, min = 0, max = 5, score = min, ...rest }) => (
  <DotscaleWrapper {...rest}>
    {label ? <Label>{label}</Label> : null}
    <DotWrapper>
      {times(max, i => <Dot key={i} value={i < score} />)}
    </DotWrapper>
  </DotscaleWrapper>
);

Dotscale.propTypes = {
  label: PropTypes.string,
  score: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  zebra: PropTypes.bool,
};

export default Dotscale;
