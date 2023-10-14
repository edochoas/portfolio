import { Inject, Injectable, StreamableFile } from '@nestjs/common';
import { CurrencyExchangeCalculator } from '../model/currency-exchange-calculator';
import { Renderer } from '../model/transaction-detail-renderer';

@Injectable()
export class CurrencyExchangeService {
  constructor(
    @Inject('RENDERER') private renderer: Renderer,
    private converter: CurrencyExchangeCalculator
  ) {}

  calculateBestExchangeRates(amount: number) {
    const transactionDetails =
      this.converter.calculateBestExchangeRates(amount);
    const fileData = this.renderer.render(transactionDetails);
    return new StreamableFile(Buffer.from(fileData));
  }
}
