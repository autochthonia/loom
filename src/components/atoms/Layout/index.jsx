import React from 'react';
import { isString, isNumber, isObject, isArray } from 'lodash';
import styled from 'styled-components';
import * as t from 'styled-components-mixins/tachyons';

import PropTypes from 'prop-types';

const flexJustify = justify => {
  switch (justify) {
    case 'between':
      return t.justify_between;
    case 'start':
    default:
      return t.justify_start;
  }
};

const flexDirection = direction => {
  console.log(direction);
  switch (direction) {
    case 'column':
      return t.flex_column;
    case 'row':
    default:
      return t.flex_row;
  }
};

export const Flex = styled.div`
  ${t.flex};
  ${({ justify }) => flexJustify(justify)};
  ${({ direction }) => flexDirection(direction)};
  margin-left: ${({ gutter }) => '-' + gutter};
  margin-right: ${({ gutter }) => '-' + gutter};
`;
export const FlexChild = styled.div`
  ${t.flex};
  flex-basis: ${({ width }) => width};
  padding-left: ${({ gutter }) => gutter};
  padding-right: ${({ gutter }) => gutter};
  > * {
    ${t.w_100};
  }
`;

const getFlexWidth = (columns, idx) => {
  if (isString(columns) || isNumber(columns))
    return `${parseInt(columns, 10) / 12 * 100}%`;
  if (isArray(columns)) return getFlexWidth(columns[idx]);
  return 'auto';
};

export const Row = ({ children, columns = null, gutter = 'none', ...rest }) => (
  <Flex gutter={gutter} {...rest}>
    {React.Children.map(children, (child, idx) => (
      <FlexChild key={idx} width={getFlexWidth(columns, idx)} gutter={gutter}>
        {child}
      </FlexChild>
    ))}
  </Flex>
);

Row.propTypes = {
  children: PropTypes.element,
};
