import { Get, Post, Patch, Delete, Body, Param, Query, Inject, Controller } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ApiTags, ApiForbiddenResponse } from '@nestjs/swagger';
import { Request } from 'express';

import { Public, ParseIntPipe, Protocol } from '../common';
import { CreateCoffeeDto, UpdateCoffeeDto, PaginationQueryDto } from './dto';
import { CoffeeService } from './coffee.service';

@ApiTags('coffee')
@Controller('coffee')
export class CoffeeController {

  constructor(
    private readonly _coffeeService: CoffeeService,
    @Inject(REQUEST) private readonly _request: Request,
  ) { }

  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Public()
  @Get()
  async findAll(@Protocol('https') protocol: string, @Query() paginationQuery: PaginationQueryDto) {
    console.log(protocol);
    return this._coffeeService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
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
