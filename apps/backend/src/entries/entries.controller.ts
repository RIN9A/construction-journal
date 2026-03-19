import { Controller, Query, Get, Patch, ParseIntPipe, Param, Body, Post, Delete } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { CreateEntryDto } from './dto/create-entry.dto';

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Get()
  findAll(
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
    @Query('sort') sort: 'asc' | 'desc' = 'desc',
  ) {
    return this.entriesService.findAll(dateFrom, dateTo, sort);
  }
  @Post()
  create(@Body() dto: CreateEntryDto) {
    return this.entriesService.create(dto);
  }
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEntryDto) {
    return this.entriesService.update(id, dto);
  }
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.entriesService.remove(id);
  }

}
