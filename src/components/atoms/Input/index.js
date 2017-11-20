import styled from 'styled-components';

const TextInput = styled.input.attrs({
  type: 'text',
})`
  background: transparent;
  border: none;
  border-bottom: 1px solid yellow;
`;

export const NumberInput = styled(TextInput).attrs({
  type: 'number',
})``;

export const Checkbox = styled(TextInput).attrs({
  type: 'checkbox',
})``;

export default TextInput;
