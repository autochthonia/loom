import React from 'react';
import { isFunction } from 'lodash';
import PropTypes from 'prop-types';

const Load = ({ data, Wrapper, children }) => {
  if (data && data.loading) {
    return <Wrapper>Loading</Wrapper>;
  }

  if (data && data.error) {
    return <Wrapper>Error</Wrapper>;
  }

  return <Wrapper>{isFunction(children) ? children() : children}</Wrapper>;
};

Load.propTypes = {
  Wrapper: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.bool,
  }).isRequired,
};

Load.defaultProps = {
  Wrapper: 'div',
};

export default Load;
