import { Injectable } from '@nestjs/common';
import { Converter } from '../model/converter';

@Injectable()
export class AppService {
  constructor(private converter: Converter) {}
  
  calculateBestConversions(
    amount: number
  ) {
    return this.converter.findBestConversionRates(amount);
  }
}
