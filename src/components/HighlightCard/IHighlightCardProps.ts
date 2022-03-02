export default interface IHighlightCardProps {
  type: 'income' | 'outcome' | 'summary';
  title: string;
  amount: string;
  lastTransaction?: string;
}
