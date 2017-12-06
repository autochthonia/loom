import { withStateHandlers } from 'recompose';
import React from 'react';
import styled from 'styled-components';
import * as t from 'styled-components-mixins/tachyons';

import PropTypes from 'prop-types';

import Dotscale from '../Dotscale';
import Input from '../../atoms/Input';

export const NewMeritWrapper = styled.form`
  ${t.flex};
  ${t.justify_between};
`;

const NewMerit = ({ label, score, setLabel, setScore, handleNewMerit }) => (
  <NewMeritWrapper
    onSubmit={e => {
      e.preventDefault();
      handleNewMerit({ label, score });
    }}
  >
    <Input label="Description" value={label} onChange={setLabel} />
    <Dotscale score={score} onChange={setScore} />
    <Input type="submit" value="add" />
  </NewMeritWrapper>
);

NewMerit.propTypes = {
  label: PropTypes.string,
  score: PropTypes.number,
  setLabel: PropTypes.func,
  setScore: PropTypes.func,
  handleNewMerit: PropTypes.func,
};

export default withStateHandlers(
  { label: '', score: 0 },
  {
    setLabel: state => ({ target: { value: label } }) => ({
      ...state,
      label,
    }),
    setScore: state => score => ({
      ...state,
      score,
    }),
  },
)(NewMerit);
