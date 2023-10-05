import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HttpModule } from '@nestjs/axios';
import { AppService } from './app.service';
import { ApiService } from './api/api.service';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService, ApiService],
})
export class AppModule {}
