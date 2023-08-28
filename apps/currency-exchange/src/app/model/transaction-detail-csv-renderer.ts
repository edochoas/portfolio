import { Renderer, TransactionDetail } from './transaction-detail-renderer';

export class TransactionDetailCSVRenderer implements Renderer {
  render(data: TransactionDetail[]): string {
    const headers = ['Currency Code', 'Country', 'Amount', 'Path'];
    const csvData = [];
    csvData.push(headers.join(','));
    data.forEach((transaction) => {
      const values = Object.values(transaction);
      csvData.push(values.join(','));
    });
    return csvData.join('\n');
  }
}
