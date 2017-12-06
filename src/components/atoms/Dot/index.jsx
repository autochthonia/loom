import styled from 'styled-components';
import React from 'react';

import PropTypes from 'prop-types';

const SVG = styled.svg.attrs({
  xmlns: 'http://www.w3.org/2000/svg',
})`
  width: 14px;
  height: 14px;
  display: inline-block;
`;

const Circle = styled.circle`
  fill: ${props => (props.value ? '#000' : '#fff')};
  stroke: #000;
  stroke-width: 2;
`;

const Dot = ({ value = false }) => (
  <SVG>
    <Circle cx="7" cy="7" r="6" value={value} />
  </SVG>
);

Dot.propTypes = {
  value: PropTypes.bool,
};
Dot.defaultProps = {
  value: false,
};

export default Dot;
