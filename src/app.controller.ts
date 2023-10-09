import { Controller, Get, Query } from '@nestjs/common';
import { ApiService } from './api/api.service';
// import { ResponseDataType } from './api/currency.api.response';

@Controller()
export class AppController {
  constructor(private readonly apiService: ApiService) {}

  @Get('/currencies')
  async getCurrencies() {
    const currencies = await this.apiService.fetchCurrencies();
    return Object.values(currencies.data).map((currency) => ({
      code: currency.code,
      name: currency.name,
    }));
  }

  @Get('/exchange_rates')
  async getExchangeRates(
    @Query('currencies') currencies: string | undefined,
    @Query('base_currency') baseCurrency: string = 'USD',
    @Query('value') value = '1',
  ) {
    const exchangeRates = await this.apiService.fetchExchangeRates({
      currencies: currencies ? currencies.split(',') : [],
      baseCurrency,
    });

    return Object.entries(exchangeRates.data).reduce((acc, [, data]) => {
      const newData = {
        code: data.code,
        value: data.value * Number.parseInt(value, 10),
      };

      acc.push(newData);

      return acc;
    }, []);
    // let lastExchangeRates = await databaseService.getExchangeRates();

    // const twoHoursAge = new Date() - '2 hours';

    // if (!lastExchangeRates && lastExchangeRates.created_at > twoHoursAge) {
    //   const exchangeRates = await this.apiService.fetchExchangeRates({
    //     currencies: currencies ? currencies.split(',') : [],
    //     baseCurrency,
    //   });

    //   await databaseService.saveExchangeRates(exchangeRates);
  }
}
