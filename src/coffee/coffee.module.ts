import { Module, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Event } from '../events/entities';
import { Coffee, Flavor } from './entities';
import { COFFEE_BRANDS } from './constants';

import coffeeConfig from './config/coffee.config';
import { CoffeeService } from './coffee.service';

import { CoffeeController } from './coffee.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Event,
      Coffee,
      Flavor,
    ]),
    ConfigModule.forFeature(coffeeConfig),
  ],
  providers: [
    CoffeeService,
    {
      provide: COFFEE_BRANDS,
      useFactory: () => ['buddy brew', 'nescafe'],
      scope: Scope.TRANSIENT,
    }
  ],
  controllers: [CoffeeController],
  exports: [CoffeeService],
})
export class CoffeeModule { }
