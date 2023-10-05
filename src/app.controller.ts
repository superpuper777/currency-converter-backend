import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiService } from './api/api.service';
import { ResponseDataType } from './api/currency.api.response';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly apiService: ApiService,
  ) {}

  @Get()
  getCurrencies(): Promise<ResponseDataType> {
    return this.apiService.fetchCurrencies();
  }
}
