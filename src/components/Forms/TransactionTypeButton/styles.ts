import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

interface IconProps {
  type: 'income' | 'outcome';
}

interface ContainerProps {
  isActive: boolean;
  type: 'income' | 'outcome';
}

export const Container = styled(RectButton) <ContainerProps>`
  width: 48%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.background};

  padding: 16px;
  border-width: ${({ isActive }) => isActive ? 0 : 1.5}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  ${({ isActive, type }) => isActive && type === 'income' && css`
    background-color: ${({ theme }) => theme.colors.success_light};
  `};

  ${({ isActive, type }) => isActive && type === 'outcome' && css`
    background-color: ${({ theme }) => theme.colors.warning_light};
  `};

`;

export const Icon = styled(Feather) <IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: ${RFValue(12)}px;

  color: ${({ theme, type }) =>
    type === 'income' ? theme.colors.success : theme.colors.warning
  };

`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
`;
