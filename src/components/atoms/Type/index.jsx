import styled from 'styled-components';
import * as t from 'styled-components-mixins/tachyons';

export const Caption = styled.span`
  ${t.lh_title};
  ${t.ttu};
  ${t.tracked};
  ${t.dib};
  ${t.tc};
  ${t.w_100};
  ${t.relative};
  &::after {
    ${t.w_100};
    ${t.dib};
    ${t.absolute} left: 0;
    right: 0;
    top: calc(50% - 2px);
    content: '';
    height: 4px;
    background: gold;
    z-index: -1;
  }
`;
