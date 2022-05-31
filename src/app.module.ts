import { Module } from '@nestjs/common';
import { StatsModule } from './stats/stats.module';
import { Web3Module } from './web3/web3.module';

@Module({
  imports: [StatsModule, Web3Module],
})
export class AppModule {}
