import { Module } from '@nestjs/common';
import { CronogramController } from './cronogram.controller';
import { CronogramService } from './cronogram.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CronogramController],
  providers: [CronogramService, PrismaService]
})
export class CronogramModule {}
