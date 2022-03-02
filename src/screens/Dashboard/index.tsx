import React from 'react';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title
} from './styles';

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

      <HighlightCards>
        <HighlightCard
          key={'income'}
          type='income'
          title='Entradas'
          amount='R$ 17.400,00'
          lastTransaction='Última entrada dia 13 de abril'
        />
        <HighlightCard
          key={'outcome'}
          type='outcome'
          title='Saídas'
          amount='R$ 10.400,00'
          lastTransaction='Última entrada dia 11 de abril'
        />
        <HighlightCard
          key={'summary'}
          type='summary'
          title='Total'
          amount='R$ 7.000,00'
        />
      </HighlightCards>

      <Transactions>
        <Title>Transações</Title>

        <TransactionCard />
      </Transactions>

    </Container>
  );
}

export default Dashboard;
