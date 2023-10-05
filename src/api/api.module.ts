import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [ApiService],
  exports: [ApiService],
})
export class ApiModule {}
