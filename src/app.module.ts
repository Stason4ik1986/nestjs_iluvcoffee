import { Module } from '@nestjs/common';

import { CoffeeModule } from './coffee/coffee.module';

import { AppService } from './app.service';

import { AppController } from './app.controller';

@Module({
  imports: [CoffeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
