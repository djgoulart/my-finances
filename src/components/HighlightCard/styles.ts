import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

interface TypeProps {
  type: 'income' | 'outcome' | 'summary';
}

export const Container = styled.View<TypeProps>`
  background-color: ${({ theme, type }) =>
    type === 'summary' ? theme.colors.secondary : theme.colors.shape};

  width: ${RFValue(300)}px;
  border-radius: 5px;
  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme, type }) =>
    type === 'summary' ? theme.colors.shape : theme.colors.title};
`;

export const Icon = styled(Feather) <TypeProps>`
  font-size: ${RFValue(40)}px;

  ${({ type }) => type === 'income' && css`
    color: ${({ theme }) => theme.colors.success};
  `};

  ${({ type }) => type === 'outcome' && css`
    color: ${({ theme }) => theme.colors.warning};
  `};

  ${({ type }) => type === 'summary' && css`
    color: ${({ theme }) => theme.colors.shape};
  `};
`;

export const Content = styled.View``;

export const Amount = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  margin-top: 38px;
  color: ${({ theme, type }) =>
    type === 'summary' ? theme.colors.shape : theme.colors.title};
`;

export const LastTransaction = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme, type }) =>
    type === 'summary' ? theme.colors.shape : theme.colors.text};
`;

