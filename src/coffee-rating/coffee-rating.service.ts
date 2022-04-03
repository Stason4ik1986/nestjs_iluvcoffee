import { Injectable } from '@nestjs/common';

import { CoffeeService } from '../coffee/coffee.service';

@Injectable()
export class CoffeeRatingService {

  constructor(private readonly _coffeeService: CoffeeService) {

  }

}
