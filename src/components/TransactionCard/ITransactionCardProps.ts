export interface ICategoryData {
  key: string;
  name: string;
  icon: string;
}

export interface ITransactionCardData {
  _id: string;
  name: string;
  price: string;
  category: string;
  created_at: string;
  transactionType: 'income' | 'outcome';
}

export interface ITransactionCardProps {
  data: ITransactionCardData;
}
