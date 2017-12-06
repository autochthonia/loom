import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';

import { Caption } from '../../atoms/Type';
import NewMerit from '../../molecules/Sheet_NewMerit/NewMerit';

const MeritsWrapper = styled.div``;

const Merits = ({ handleNewMerit, ...rest }) => (
  <MeritsWrapper {...rest}>
    <Caption>Merits</Caption>
    <NewMerit onSubmit={handleNewMerit} />
  </MeritsWrapper>
);

Merits.propTypes = {
  handleNewMerit: PropTypes.func,
};

export default Merits;
