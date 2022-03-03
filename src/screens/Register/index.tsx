import React, { useState } from 'react';

import { Input } from '../../components/Forms/Input';
import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';

import { Container, Header, Title, Form, Fields, TransactionTypes } from './styles';
import { CategorySelect } from '../../components/Forms/CategorySelect';

export default function Register() {
  const [transactionType, setTransactionType] = useState('');

  function handleTransactionTypeSelect(type: 'income' | 'outcome') {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder='Nome' />
          <Input placeholder='Preço' />

          <TransactionTypes>
            <TransactionTypeButton
              title='Income'
              type='income'
              onPress={() => handleTransactionTypeSelect('income')}
              isActive={transactionType === 'income'}
            />
            <TransactionTypeButton
              title='Outcome'
              type='outcome'
              onPress={() => handleTransactionTypeSelect('outcome')}
              isActive={transactionType === 'outcome'}
            />
          </TransactionTypes>

          <CategorySelect title='Categoria' />
        </Fields>

        <Button title='Enviar' />
      </Form>
    </Container>
  );
}
