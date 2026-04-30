import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  BoilReportResponse,
  BoilResponse,
  BoilResultDto,
  BoilsListService,
} from './boils.list.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetBoilsDto } from '../boils/dto/get-boils.dto';

@ApiTags('Список основ')
@Controller('boils_list')
export class BoilsListController {
  constructor(private boilsListService: BoilsListService) {}
  // app boilservice
  @ApiOperation({ summary: 'Получить все типы записей с параметрами' })
  @Post()
  getAllWithParams(@Body() dto: GetBoilsDto): Promise<BoilResponse> {
    return this.boilsListService.getBoilsListWithFilter(dto);
  }
  // app boilservice
  @ApiOperation({ summary: 'Получить все типы записей с параметрами' })
  @Post('/report')
  getReportWithParams(@Body() dto: GetBoilsDto): Promise<BoilReportResponse> {
    return this.boilsListService.getBoilsReportWithFilter(dto);
  }
  // ??
  @ApiOperation({ summary: 'Получить запись по id' })
  @Get('/boil/:boil_id')
  getBoilById(@Param('boil_id') boil_id: string): Promise<BoilResultDto> {
    return this.boilsListService.getBoilsListRow(Number(boil_id));
  }
}
