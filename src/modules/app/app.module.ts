import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { appConfig, discordConfig } from '../../configs';
import { BootstrapModule } from '../bootstrap/bootstrap.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, discordConfig],
    }),
    BootstrapModule,
    ScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
