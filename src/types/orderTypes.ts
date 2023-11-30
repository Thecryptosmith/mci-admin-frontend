import { OrderStatusEnum } from "@src/common/emuns/OrderStatusEnum";
import { OrderTypeEnum } from "@src/common/emuns/OrderTypeEnum";
import { PriceData } from "@src/types/PriceData";

export type BaseOrder = {
  id: number;
  orderType: OrderTypeEnum;
  orderStatus: OrderStatusEnum;
  orderCode: string;
  priceData: PriceData;
};

export type SendingToken = {
  id: number;
  name: string;
  symbol: string;
  logo: string;
  amount: string;
};

export type ReceivingToken = {
  id: number;
  name: string;
  symbol: string;
  logo: string;
  amount: number;
};

export type UserWalletInfo = {
  cryptocurrencyLogo: string;
  cryptocurrencyName: string;
  cryptocurrencySymbol: string;
  receivingWallet: string;
  walletMemo: string;
  walletAddress: string;
};

export type CompanyWalletInfo = {
  amount: string;
  cryptocurrencyLogo: string;
  cryptocurrencyName: string;
  cryptocurrencySymbol: string;
  network: string;
  walletAddress: string;
};

export type BankAccount = {
  paymentReference: string;
  companyName: string;
  sortCode: string;
  accountNumber: string;
  companyAddress: string;
  paymentAmount: string;
};

export type ExchangeOrder = {
  sendingToken: SendingToken;
  receivingToken: ReceivingToken;
  userWalletInfo: UserWalletInfo;
  companyWalletInfo: CompanyWalletInfo;
};

export type BuyOrder = {
  receivingToken: ReceivingToken;
  userWalletInfo: UserWalletInfo;
  companyBankAccount: BankAccount;
};

export type SellOrder = {
  sendingToken: SendingToken;
  companyWalletInfo: CompanyWalletInfo;
  userBankAccount: BankAccount;
};

export type ExchangeOrderType = BaseOrder & ExchangeOrder;

export type BuyOrderType = BaseOrder & BuyOrder;

export type SellOrderType = BaseOrder & SellOrder;
