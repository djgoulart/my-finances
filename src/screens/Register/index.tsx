import React, { useState } from 'react';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

import { InputForm } from '../../components/Forms/InputForm';
import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import CategorySelect from '../CategorySelect';

import { Container, Header, Title, Form, Fields, TransactionTypes } from './styles';

interface FormData {
  [name: string]: any;
}

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Nome é obrigatório'),
  price: Yup.number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('Valor é obrigatório'),
});

export default function Register() {
  const dataKey = '@myfinances:transactions';

  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const { navigate }: NavigationProp<ParamListBase> = useNavigation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
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

  async function handleFormSubmit(form: FormData) {

    if (!transactionType)
      return Alert.alert('Selecione o tipo da transação');

    if (category.key === 'category')
      return Alert.alert('Selecione a categoria');

    const newTransaction = {
      _id: String(uuid.v4().toString()),
      name: form.name,
      price: form.price,
      category: category.key,
      transactionType,
      created_at: new Date(),
    };

    try {
      const data = await AsyncStorage.getItem(dataKey)
      const currentTransactions = data ? JSON.parse(data) : [];

      const newTransactions = [
        ...currentTransactions,
        newTransaction
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(newTransactions));

      setTransactionType('');
      setCategory({ key: 'category', name: 'Category' });
      reset();

      navigate('Transações');

    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar a transação.");
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
    >
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
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />

            <InputForm
              name="price"
              control={control}
              placeholder='Valor'
              keyboardType='numeric'
              error={errors.price && errors.price.message}
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
    </TouchableWithoutFeedback>
  );
}
