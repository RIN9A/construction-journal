import { Injectable } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EntriesService {
  constructor(private prisma: PrismaService) {}

  findAll(dateFrom?: string, dateTo?: string, sortOrder: 'asc'|'desc' = 'desc') {
    return this.prisma.entry.findMany({
      where: {
        date: {
        ...(dateFrom ? {gte: new Date(dateFrom)} : {}),
        ...(dateTo ? {lte: new Date(dateTo)} : {}),
      },
    },
  include: {workType: true},
  orderBy: {date: sortOrder},
    });
  }

  create(dto: CreateEntryDto) {
    return this.prisma.entry.create({
      data: {...dto, date: new Date(dto.date)},
      include: {workType: true},
    });
  }
  update(id: number, dto: UpdateEntryDto) {
    return this.prisma.entry.update({
      where: {id},
      data: {...dto, ...(dto.date ? {date: new Date(dto.date)} : {})},
      include: {workType: true},
    });
  }
  remove(id: number) {
    return this.prisma.entry.delete({where : { id }})
  }

}
