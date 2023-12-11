import { TokenPairPositionEnum } from "@src/common/emuns/TokenPairPositionEnum";

export type TokenInfoType = {
  coinMarketId: number;
  logo: string;
  name: string;
  symbol: string;
  slug: string;
  description?: string | null;
  dateAdded?: string | null;
  dateLaunched?: string | null;
  category?: string | null;
  stakedCoins?: string | null;
  krakenAssetName: string;
  rank?: number | null;
  minOrderValue: number;
};

export type TokenPairType = {
  defaultTokenId: number;
  pairName: string;
  defaultTokenPosition: TokenPairPositionEnum;
};

export type TokenCompanyWalletType = {
  networkId: number;
  walletAddress: string;
  name: string;
  memo?: string | null;
};

export type CreateTokenReqPayload = {
  tokenInfo: TokenInfoType;
  tokenPair: TokenPairType;
  companyWallets: TokenCompanyWalletType[];
};
