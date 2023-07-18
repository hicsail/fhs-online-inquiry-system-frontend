import { Module } from '@nestjs/common';
import { BrainDataService } from './brain_data.service';
import { BrainDataController } from './brain_data.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BrainDataController],
  providers: [BrainDataService, PrismaService]
})
export class BrainDataModule {}
