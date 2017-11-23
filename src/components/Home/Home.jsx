import { Link } from 'react-router-dom';
import React from 'react';

const Home = ({}) => (
  <div
    className="Home"
    style={{ paddingTop: '200px', margin: '0 auto', width: '600px' }}
  >
    <Link to="/cja973seudulw0131rtu9gge5">
      This is the only room I've created so far
    </Link>
  </div>
);

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
