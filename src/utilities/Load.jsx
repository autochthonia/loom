import React from 'react';
import PropTypes from 'prop-types';

const Load = ({ data, Wrapper, children }) => {
  if (data && data.loading) {
    return <Wrapper>Loading</Wrapper>;
  }

  if (data && data.error) {
    return <Wrapper>Error</Wrapper>;
  }

  return <Wrapper>{children}</Wrapper>;
};

Load.propTypes = {
  Wrapper: PropTypes.element,
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.bool,
  }).isRequired,
};

Load.defaultProps = {
  Wrapper: 'div',
};

export default Load;
