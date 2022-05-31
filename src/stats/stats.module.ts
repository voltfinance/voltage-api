import { Module } from '@nestjs/common';
import { Web3Module } from 'src/web3/web3.module';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

@Module({
  imports: [Web3Module],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
