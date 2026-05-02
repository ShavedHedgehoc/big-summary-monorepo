import { Controller, Get } from '@nestjs/common';
// import { ConveyorsService } from './conveyors.service';
import { pgPrisma } from '../../../../packages/database/postgres';

@Controller('conveyors')
export class ConveyorsController {
  // constructor(private readonly conveyorsService: ConveyorsService) { }
  constructor() { }
  @Get()
  findAll() {
    return pgPrisma.conveyors.findMany()
    // return this.conveyorsService.findAll();
  }
}
