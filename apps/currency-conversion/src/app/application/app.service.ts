import { Inject, Injectable, StreamableFile } from '@nestjs/common';
import { Converter } from '../model/converter';
import { Renderer } from '../model/renderer';

@Injectable()
export class AppService {
  constructor(
    @Inject('RENDERER') private renderer: Renderer,
    private converter: Converter
  ) {}
  
  calculateBestConversions(
    amount: number
  ) {
    const transactionDetails = this.converter.findBestConversionRates(amount);
    const fileData = this.renderer.render(transactionDetails);
    return new StreamableFile(Buffer.from(fileData));
  }
}
