import { Injectable, HttpStatus, HttpException, } from '@nestjs/common';

import { Coffee } from './entities';
import { CreateCoffeeDto, UpdateCoffeeDto } from './dto';

@Injectable()
export class CoffeeService {
  private _coffees: Coffee[] = [{
    id: 1,
    name: 'Shipwreck Roast',
    brand: 'Buddy Brew',
    flavors: ['chocolate', 'vanilla'],
  }];

  findAll(): Coffee[] {
    return this._coffees;
  }

  findOne(id: number): Coffee {
    const coffee = this._coffees.find(item => item.id === id);

    if (!coffee) {
      throw new HttpException(`Coffee ${id} not found`, HttpStatus.NOT_FOUND)
    }

    return coffee;
  }

  create(createCoffeeDto: any): void {
    this._coffees.push(createCoffeeDto);
  }

  update(id: number, updateCoffeeDto: any): void {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {

    }
  }

  remove(id: number): void {
    const coffeeIndex = this._coffees.findIndex(item => item.id === id);

    if (coffeeIndex >= 0) {
      this._coffees.splice(coffeeIndex, 1);
    }
  }
}
