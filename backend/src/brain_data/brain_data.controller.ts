import { Controller, Get, Body, ValidationPipe, Post } from '@nestjs/common';
import { BrainDataService } from './brain_data.service';
import { FilterBrainData } from './dto/filter_brain_data.dto';

@Controller('brain-data')
export class BrainDataController {
  constructor(private readonly brainDataService: BrainDataService) {}

  @Post()
  brainDataSummary(@Body() filter: FilterBrainData) {
    return this.brainDataService.getSummary(filter);
  }
}
