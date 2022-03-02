import React from 'react';

import HighlightCard from '../../components/HighlightCard';


import { Container, Header, UserWrapper, UserInfo, Photo, User, UserGreeting, UserName, Icon, } from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/10280312?v=4' }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Diego</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCard />
    </Container>
  );
}

export default Dashboard;
