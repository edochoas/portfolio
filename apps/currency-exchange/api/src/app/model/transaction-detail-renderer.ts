interface TransactionDetail {
  currencyCode: string;
  country: string;
  amount: number;
  path: string;
}

interface TransactionDetailRenderer {
  render(data: TransactionDetail[]): string;
}

export { TransactionDetail, TransactionDetailRenderer as Renderer };
