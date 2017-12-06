import React from 'react';
import styled from 'styled-components';
import * as t from 'styled-components-mixins/tachyons';

import PropTypes from 'prop-types';

import TextInput, { Checkbox, NumberInput } from '../../atoms/Input';

export const LabeledInputWrapper = styled.div`
  ${t.flex};
  ${t.justify_between};
`;

const LabeledInput = ({ type = 'text', ...rest }) => {
  let Input;
  switch (type) {
    case 'number':
      Input = NumberInput;
      break;
    case 'checkbox':
      Input = Checkbox;
      break;
    case 'text':
    default:
      Input = TextInput;
      break;
  }
  return (
    <LabeledInputWrapper>

      <Input {...rest} />
    </LabeledInputWrapper>
  );
};

LabeledInput.propTypes = {
  type: PropTypes.oneOf(['text', 'number', 'checkbox']),
};

export default LabeledInput;
