import { gql } from 'apollo-client-preset';
import { propType } from 'graphql-anywhere';
import React, { Component } from 'react';
import styled from 'styled-components';

import Combatant from '../Combatant/Combatant';
import CombatantList from '../CombatantList';
import Load from '../../utilities/Load';
import TurnInfo from '../TurnInfo';

export const RoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 600px;
  margin: 0 auto;
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
        owner {
          id
        }
        players {
          id
        }
        combatants {
          ... Combatant
        }
        turn
      }
      ${Combatant.fragments.combatant}
    `,
  };
  static propTypes = {
    room: propType(Room.fragments.room).isRequired,
  };
  static defaultProps = {};

  render() {
    return (
      <Load Wrapper={RoomWrapper} data={this.props.data}>
        {() => (
          <RoomWrapper>
            <Header>Room Name - owner - {this.props.match.params.room}</Header>
            <Main>
              <TurnInfo />
              <CombatantList turn={this.props.data.Room.turn} />
            </Main>
            <Footer>footer</Footer>
          </RoomWrapper>
        )}
      </Load>
    );
  }
}

export default Room;
