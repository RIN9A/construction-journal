import { Module } from '@nestjs/common';
import { EntriesModule } from './entries/entries.module';
import { WorkTypesModule } from './work-types/work-types.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    EntriesModule,
    WorkTypesModule
  ],
})
export class AppModule {}
