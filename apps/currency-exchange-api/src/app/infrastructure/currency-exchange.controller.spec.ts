import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './currency-exchange.controller';
import { AppService } from '../application/app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to currency-conversion!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({
        message: 'Welcome to currency-conversion!',
      });
    });
  });
});
