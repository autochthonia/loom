import { gql } from 'apollo-client-preset';
import { propType } from 'graphql-anywhere';
import React, { Component } from 'react';
import styled from 'styled-components';

import CombatantList from '../CombatantList';
import Load from '../../utilities/Load';
import TurnInfo from '../TurnInfo';

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
  static fragments = {
    room: gql`
      fragment Room on Room {
        id
        name
        initiative
        turnOver
      }
    `,
  };
  static propTypes = {
    room: propType(Room.fragments.room).isRequired,
  };
  static defaultProps = {};

  render() {
    console.log(this.props);
    return (
      <Load Wrapper={RoomWrapper} data={this.props.data}>
        <Header>Room Name - owner - {this.props.match.params.room}</Header>
        <Main>
          <TurnInfo />
          <CombatantList />
        </Main>
        <Footer>footer</Footer>
      </Load>
    );
  }
}

export default Room;
