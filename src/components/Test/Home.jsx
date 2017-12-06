import { Link } from 'react-router-dom';
import React from 'react';

import styled from 'styled-components';
import * as t from 'styled-components-mixins/tachyons';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 120px;
`;

const Line = styled.div`
  height: 100%;
  width: 6px;
  margin: 0 22px;
  background: red;
  position: absolute;
  z-index: -1;
`;
const Combatant = styled.div`
  display: flex;
  margin: 20px 0;
  span {
    vertical-align: middle;
  }
`;
const Icon = styled.img`
  border-radius: 50%;
  background: white;
  height: 50px;
  border: 1px solid black;
  ${t.mr3};
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Initiative = styled.span`
  ${t.mr3};
  ${t.f2};
  ${t.lh_title};
`;
const Name = styled.span`
  ${t.f2};
  ${t.lh_title};
`;

const CombatantBlock = (
  <Combatant>
    <Row>
      <Icon src="https://vignette.wikia.nocookie.net/whitewolf/images/b/bb/ExaltedSolars.png/revision/latest?cb=20160705002233" />
      <Initiative>12</Initiative>
      <Name>Harmonious Jade</Name>
    </Row>
  </Combatant>
);

const Home = ({}) => (
  <Wrapper>
    <Line />
    {CombatantBlock}
    {CombatantBlock}
    {CombatantBlock}
  </Wrapper>
);

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
