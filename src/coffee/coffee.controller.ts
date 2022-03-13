import { Get, Post, Patch, Delete, Body, Param, Query, Controller, } from '@nestjs/common';

import { CreateCoffeeDto, UpdateCoffeeDto } from './dto';
import { CoffeeService } from './coffee.service';

@Controller('coffee')
export class CoffeeController {

  constructor(private readonly _coffeeService: CoffeeService) {

  }

  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return this._coffeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this._coffeeService.findOne(id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this._coffeeService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this._coffeeService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this._coffeeService.remove(id);
  }
}
