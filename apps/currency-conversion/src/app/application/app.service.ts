import { Injectable } from '@nestjs/common';
import { Converter } from '../model/converter';

@Injectable()
export class AppService {
  constructor(private converter: Converter) {}
  
  calculateBestConversion(
    from: string,
    to: string,
    amount: number
  ) {
    console.log(`from: ${from}, to: ${to}, amount: ${amount}`)
  }
}
