import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
// import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

import {
  CurrenciesResponse,
  ExchangeRatesResponse,
} from './currency.api.response';

import * as qs from 'qs';

const BASE_CURRENCIES = ['EUR', 'RUB', 'USD', 'BYN'];

interface FetchExchangeRatesOptions {
  currencies: string[];
  baseCurrency: string;
}
@Injectable()
export class ApiService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}
  apiKey = this.configService.get<string>('API_KEY');
  baseUrl = this.configService.get<string>('BASE_URL');

  async fetchExchangeRates(
    options: FetchExchangeRatesOptions,
  ): Promise<ExchangeRatesResponse> {
    const currencies = BASE_CURRENCIES.concat(options.currencies);

    const response = await lastValueFrom(
      this.httpService.get<ExchangeRatesResponse>(`${this.baseUrl}latest`, {
        params: {
          apikey: this.apiKey,
          currencies: currencies,
          base_currency: options.baseCurrency,
        },
        paramsSerializer: {
          serialize: (params: Record<string, any>) =>
            qs.stringify(params, { arrayFormat: 'comma' }),
        },
      }),
    ).catch((err) => {
      console.log(err);
    });

    if (!response) {
      throw new BadRequestException('Something bad happened');
    }

    return response.data;
  }

  async fetchCurrencies(): Promise<CurrenciesResponse> {
    const response = await lastValueFrom(
      this.httpService.get<CurrenciesResponse>(`${this.baseUrl}currencies`, {
        params: {
          apikey: this.apiKey,
        },
      }),
    ).catch((err) => {
      console.log(err);
    });

    if (!response) {
      throw new BadRequestException('Something bad happened');
    }

    return response.data;
  }
}
