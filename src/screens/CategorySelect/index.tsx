import React from 'react';
import { FlatList } from 'react-native';
import { categories } from '../../utils/categories';
import { Button } from '../../components/Forms/Button';

import { Container, Header, Title, Category, Icon, Name, Separator, Footer } from './styles';

interface ICategory {
  key: string;
  name: string;
}

interface Props {
  category: ICategory;
  setCategory: (category: ICategory) => void;
  handleCloseSelect: () => void;
}

export default function CategorySelect({
  category,
  setCategory,
  handleCloseSelect
}: Props) {

  function handleSelectCategory(category: ICategory) {
    setCategory(category)
  }

  return (
    <Container>
      <Header>
        <Title>Categorias</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleSelectCategory(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
      <Footer>
        <Button
          title='Selecionar'
          onPress={handleCloseSelect}
        />
      </Footer>
    </Container>
  );
}
