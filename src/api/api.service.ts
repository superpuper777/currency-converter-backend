import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { ResponseType, ResponseDataType } from './currency.api.response';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ApiService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}
  apiKey = this.configService.get<string>('API_KEY');
  baseUrl = this.configService.get<string>('BASE_URL');

  async fetchCurrencies(): Promise<ResponseDataType> {
    const response = await lastValueFrom(
      this.httpService.get<AxiosResponse<ResponseType>>(
        `${this.baseUrl}latest?apikey=${this.apiKey}&currencies=EUR,RUB,BYN,USD`,
      ),
    ).catch((err) => {
      console.log(err);
    });

    const parsedResponse = plainToInstance(ResponseType, response, {
      enableCircularCheck: true,
    });
    return this.formattedData(parsedResponse.data);
  }

  private formattedData = (obj: any) => {
    const array = [];
    const { data } = obj;
    for (const key in data) {
      array.push(data[key]);
    }
    return { currency: array };
  };
}
