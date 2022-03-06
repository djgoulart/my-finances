import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useFocusEffect } from '@react-navigation/native';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';
import { ITransactionCardData } from '../../components/TransactionCard/ITransactionCardProps';
import { categories } from '../../utils/categories';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  LogoutButton,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList
} from './styles';

export interface ITransactionListData extends ITransactionCardData {
}

interface HighlightProps {
  total: string;
  lastTransaction?: string;
}
interface HighlightData {
  entries: HighlightProps;
  expenses: HighlightProps;
  summary: HighlightProps;
}

export default function Dashboard() {
  const dataKey = '@myfinances:transactions';
  const [transactions, setTransactions] = useState<ITransactionListData[]>([]);
  const [highlighInfo, setHighlightInfo] = useState<HighlightData>({} as HighlightData);

  let entriesTotal = 0;
  let expensesTotal = 0;

  function getLastTransactionDate(
    collection: ITransactionListData[],
    type: 'income' | 'outcome' | 'all'
  ) {
    let lastTransaction: Date;

    if (type === 'all') {
      lastTransaction = new Date(
        Math.max.apply(Math, collection
          .map(transaction => new Date(transaction.created_at).getTime())));

    } else {
      lastTransaction = new Date(
        Math.max.apply(Math, collection
          .filter(transaction => transaction.transactionType === type)
          .map(transaction => new Date(transaction.created_at).getTime())));
    }

    return lastTransaction.toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'long'
    })
  }

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(dataKey);
    const data = response ? JSON.parse(response) : [];

    const dataFormatted: ITransactionListData[] = data
      .map((item: ITransactionListData) => {

        if (item.transactionType === 'income') {
          entriesTotal += Number(item.price);
        } else {
          expensesTotal += Number(item.price);
        }

        const price = Number(item.price)
          .toLocaleString(
            'pt-BR',
            {
              style: 'currency',
              currency: 'BRL'
            });

        const [category] = categories.filter(cat => item.category === cat.key);

        const created_at = format(new Date(item.created_at), 'dd/MM/yy');

        return {
          _id: item._id,
          name: item.name,
          category,
          transactionType: item.transactionType,
          price,
          created_at
        }
      });

    setTransactions(dataFormatted);

    const lastEntrieTransactionDate = getLastTransactionDate(data, 'income');
    const lastExpenseTransactionDate = getLastTransactionDate(data, 'outcome');
    const lastTransactionDate = getLastTransactionDate(data, 'all');

    const summaryTotal = entriesTotal - expensesTotal;

    setHighlightInfo({
      entries: {
        total: entriesTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        lastTransaction: lastEntrieTransactionDate
      },
      expenses: {
        total: expensesTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        lastTransaction: lastExpenseTransactionDate
      },
      summary: {
        total: summaryTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        lastTransaction: lastTransactionDate
      },
    });

    entriesTotal = 0;
    expensesTotal = 0;
  }

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []))

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

          <LogoutButton onPress={() => { }}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          key={'income'}
          type='income'
          title='Entradas'
          amount={highlighInfo?.entries?.total}
          lastTransaction={`Última entrada dia ${highlighInfo?.entries?.lastTransaction}`}
        />
        <HighlightCard
          key={'outcome'}
          type='outcome'
          title='Saídas'
          amount={highlighInfo?.expenses?.total}
          lastTransaction={`Última saída dia ${highlighInfo?.expenses?.lastTransaction}`}
        />
        <HighlightCard
          key={'summary'}
          type='summary'
          title='Total'
          amount={highlighInfo?.summary?.total}
          lastTransaction={`De 1 a ${highlighInfo?.summary?.lastTransaction}`}
        />
      </HighlightCards>

      <Transactions>
        <Title>Transações</Title>
        <TransactionList
          data={transactions}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
