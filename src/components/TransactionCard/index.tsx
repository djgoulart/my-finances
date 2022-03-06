import React from 'react';
import { ITransactionCardProps } from './ITransactionCardProps';

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date
} from './styles';

export function TransactionCard({ data }: ITransactionCardProps) {
  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.transactionType}>
        {data.transactionType === 'outcome' && '- '}
        {data.price}
      </Amount>
      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <Date>{data.created_at}</Date>
      </Footer>
    </Container>
  );
}
