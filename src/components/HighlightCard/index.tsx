import React from 'react';
import IHighlightCardProps from './IHighlightCardProps';

import {
  Container,
  Header,
  Title,
  Icon,
  Content,
  Amount,
  LastTransaction,
} from './styles';

const icon = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle',
  summary: 'dollar-sign',
}

export function HighlightCard({
  type,
  title,
  amount,
  lastTransaction
}: IHighlightCardProps) {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon
          name={icon[type]}
          type={type}
        />
      </Header>
      <Content>
        <Amount type={type}>
          {amount}
        </Amount>
        <LastTransaction type={type}>
          {lastTransaction}
        </LastTransaction>
      </Content>
    </Container>
  );
}
