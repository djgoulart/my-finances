import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';

interface CategoryProps {
  isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};

  width: 100%;
  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${RFValue(19)}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;

export const Category = styled(RectButton) <CategoryProps>`
  width: 100%;
  padding: ${RFValue(15)}px;

  flex-direction: row;
  align-items: center;

  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.secondary_light : theme.colors.shape
  };
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(18)}px;
  margin-right: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;

export const Separator = styled.View`
  background-color: ${({ theme }) => theme.colors.text};
  width: 100%;
  height: 1px;
`;

export const Footer = styled.View`
  width: 100%;
  padding: ${RFValue(24)}px;
`;
