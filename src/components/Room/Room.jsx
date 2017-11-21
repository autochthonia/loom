import React, { Component } from 'react';
import styled from 'styled-components';

import CombatantList from '../CombatantList';
import Load from '../../utilities/Load';

export const RoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Header = styled.header`
  background: blue;
  color: white;
  flex: 0;
`;
const Main = styled.main`
  flex: 1;
`;
const Footer = styled.footer`
  background: green;
  color: white;
  flex: 0;
`;

class Room extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Load Wrapper={RoomWrapper} data={this.props.data}>
        <Header>Room Name - owner - {this.props.match.params.room}</Header>
        <Main>
          <CombatantList room={this.props.match.params.room} />
        </Main>
        <Footer>footer</Footer>
      </Load>
    );
  }
}

Room.propTypes = {};

Room.defaultProps = {};

export default Room;
