export interface ICategoryData {
  name: string;
  icon: string;
}

export interface ITransactionCardData {
  type: 'income' | 'outcome';
  id: string;
  title: string;
  amount: string;
  category: ICategoryData;
  date: string;
}

export interface ITransactionCardProps {
  data: ITransactionCardData;
}
