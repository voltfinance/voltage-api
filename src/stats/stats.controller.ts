import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller()
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('circulatingVolt')
  getCirculatingSupply(): Promise<string> {
    return this.statsService.getCirculatingSupply();
  }

  @Get('totalSupplyVolt')
  getTotalSupply(): Promise<string> {
    return this.statsService.getTotalSupply();
  }
}
