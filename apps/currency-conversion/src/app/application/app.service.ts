import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  calculateBestConversion(
    from: string,
    to: string,
    amount: number
  ) {
    console.log(`from: ${from}, to: ${to}, amount: ${amount}`)
  }
}
