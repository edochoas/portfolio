interface TransactionDetail {
  currencyCode: string;
  country: string;
  amount: string;
  path: string;
}

interface Renderer {
  render(data: TransactionDetail[]): string;
}

export { TransactionDetail, Renderer };
