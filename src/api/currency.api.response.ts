export class ResponseType {
  data: ResponseDataType;
}
export enum EnumCurrency {
  BYN = 'BYN',
  UDS = 'USD',
  RUB = 'RUB',
  EUR = 'EUR',
}

export class ResponseDataType {
  EnumCurrency: Record<string, number>;
  code: string;
  value: number;
}
