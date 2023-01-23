import { Module } from '@nestjs/common';

import { AppController } from './infrastructure/app.controller';
import { AppService } from './application/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
