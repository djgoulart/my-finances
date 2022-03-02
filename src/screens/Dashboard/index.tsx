import React from 'react';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';
import { ITransactionCardData } from '../../components/TransactionCard/ITransactionCardProps';

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
  Title,
  TransactionList
} from './styles';

export interface ITransactionListData extends ITransactionCardData {
}

const data: ITransactionCardData[] = [
  {
    id: '1',
    type: 'income',
    title: 'Desenvolvimento de site',
    amount: 'R$ 6.400,00',
    category: {
      name: 'Vendas',
      icon: 'dollar-sign'
    },
    date: '14/03/2022'
  },
  {
    id: '2',
    type: 'outcome',
    title: 'Hamburger',
    amount: 'R$ 64,00',
    category: {
      name: 'Alimentação',
      icon: 'coffee'
    },
    date: '10/03/2022'
  },
  {
    id: '3',
    type: 'outcome',
    title: 'Aluguel',
    amount: 'R$ 1.400,00',
    category: {
      name: 'Residência',
      icon: 'home'
    },
    date: '10/03/2022'
  },
];

export default function Dashboard() {
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
        <TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
