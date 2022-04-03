import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { Connection, Repository } from 'typeorm';

import { Event } from '../events/entities';
import { Coffee, Flavor } from './entities';
import { COFFEE_BRANDS } from './constants';
import { CreateCoffeeDto, UpdateCoffeeDto, PaginationQueryDto } from './dto';
import coffeeConfig from './config/coffee.config';

@Injectable({
  scope: Scope.REQUEST,
})
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly _coffeeRepository: Repository<Coffee>,
    @InjectRepository(Coffee)
    private readonly _flavorRepository: Repository<Flavor>,
    private readonly _connection: Connection,
    // private readonly _configService: ConfigService,
    // @Inject(coffeeConfig.KEY)
    // private readonly _coffeeConfiguration: ConfigType<typeof coffeeConfig>,
    // @Inject(COFFEE_BRANDS) private readonly _coffeeBrands: string[],
  ) {
    // const coffeeConfig = this._configService.get<string>('coffee');
    // const databaseHost = this._configService.get<string>('DATABASE_HOST', 'localhost');
    // const databaseHost = this._configService.get<string>('database.host', 'localhost');
    // console.log(coffeeConfig);
    // console.log(databaseHost);
    // console.log(this._coffeeConfiguration);
  }

  private async _preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this._flavorRepository.findOne({ name });

    if (existingFlavor) {
      return existingFlavor;
    }

    return this._flavorRepository.create({ name });
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;

    return this._coffeeRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    const coffee = await this._coffeeRepository.findOne(id, {
      relations: ['flavors'],
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map(name => this._preloadFlavorByName(name))
    );

    const coffee = this._coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });

    return this._coffeeRepository.save(coffee);
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors = await Promise.all(
      updateCoffeeDto.flavors.map(name => this._preloadFlavorByName(name))
    );
    const coffee = await this._coffeeRepository.preload({
      id,
      ...updateCoffeeDto,
      flavors,
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee ${id} not found`);
    }

    return this._coffeeRepository.save(coffee);
  }

  async remove(id: number) {
    const coffee = await this._coffeeRepository.findOne(id);

    return this._coffeeRepository.remove(coffee);
  }

  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this._connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      coffee.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release();
    }
  }
}
