import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';

import { CoffeeModule } from '../coffee/coffee.module';

import { CoffeeRatingService } from './coffee-rating.service';

@Module({
  imports: [
    CoffeeModule,
    DatabaseModule.register({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'pass123',
      port: 5432,
    }),
  ],
  providers: [CoffeeRatingService]
})
export class CoffeeRatingModule { }
