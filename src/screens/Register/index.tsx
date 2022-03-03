import React, { useState } from 'react';
import { Modal } from 'react-native';
import { useForm } from 'react-hook-form';

import { InputForm } from '../../components/Forms/InputForm';
import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import CategorySelect from '../CategorySelect';

import { Container, Header, Title, Form, Fields, TransactionTypes } from './styles';

interface FormData {
  name: string;
  price: string;
}

export default function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  function handleTransactionTypeSelect(type: 'income' | 'outcome') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleFormSubmit(form: FormData) {
    const data = {
      name: form.name,
      price: form.price,
      category: category.key,
      transactionType
    };

    console.log(data);
  }

  const {
    control,
    handleSubmit,
  } = useForm();

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm
            name="name"
            control={control}
            placeholder='Nome'
          />

          <InputForm
            name="price"
            control={control}
            placeholder='Valor'
          />

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

          <CategorySelectButton
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>

        <Button title='Enviar' onPress={handleSubmit(handleFormSubmit)} />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          handleCloseSelect={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
}
