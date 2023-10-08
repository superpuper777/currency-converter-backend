export class ResponseType {
  data: ResponseDataType;
}

type CurrencyType = {
  code: string;
  value: number;
};
export class ResponseDataType {
  currency: Array<CurrencyType>;
}
