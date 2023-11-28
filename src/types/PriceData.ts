import { CurrencyCode } from "@src/common/emuns/CurrencyCodeEnum";

export type PriceData = {
  ratio: number;
  fee: number;
  orderValue: number;
  currencyCode: CurrencyCode;
};
