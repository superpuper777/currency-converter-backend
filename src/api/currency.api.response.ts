// export class ResponseType {
//   data: ResponseDataType;
// }

// export type CurrencyType = {
//   code: string;
//   name: number;
// };
// export class ResponseDataType {
//   data: Array<CurrencyType>;
// }

export class ExchangeRatesResponse {
  meta: {
    last_updated_at: string;
  };
  data: {
    BYN: {
      code: string;
      value: number;
    };
    EUR: {
      code: string;
      value: number;
    };
    PLN: {
      code: string;
      value: number;
    };
    RUB: {
      code: string;
      value: number;
    };
    USD: {
      code: string;
      value: number;
    };
  };
}

export type CurrenciesResponse = {
  data: {
    [index: string]: {
      symbol: string;
      name: string;
      symbol_native: string;
      decimal_digits: number;
      rounding: number;
      code: string;
      name_plural: string;
    };
  };
};
