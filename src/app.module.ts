import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatsModule } from './stats/stats.module';
import { Web3Module } from './web3/web3.module';

@Module({
  imports: [StatsModule, Web3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
