import React from 'react';
import styled from 'styled-components';
import * as t from 'styled-components-mixins/tachyons';

import PropTypes from 'prop-types';

import Dotscale from '../Dotscale';

const PaddedDotscale = styled(Dotscale)`
  ${t.pa1};
`;
const DotscaleGrid = ({ className, items, zebra = true, ...rest }) => (
  <div className={className}>
    {items.map(({ label, score, ...props }, i) => (
      <PaddedDotscale
        key={`dotscale-${label}`}
        label={label}
        score={score}
        {...props}
        zebra={zebra && i % 2 === 1}
      />
    ))}
  </div>
);

DotscaleGrid.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, score: PropTypes.number }),
  ).isRequired,
  zebra: PropTypes.bool,
};

export default DotscaleGrid;
