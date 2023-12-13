export type NetworkType = {
  id: number | string;
  name: string;
  symbol: string;
  logo: string;
};

export type CompanyWalletResType = {
  id: number;
  name: string;
  memo: string;
  walletAddress: string;
  network: NetworkType;
};

export type CompanyWalletForEditType = {
  id: number;
  name: string;
  memo: string;
  walletAddress: string;
  networkId: string | number;
};

type TokenType = {
  id: number;
  coinMarketId: number;
  logo: string;
  name: string;
  symbol: string;
  krakenAssetName: string;
  slug: string;
  description: string | null;
  dateAdded: string | null;
  dateLaunched: string;
  category: string | null;
  stakedCoins: string | null;
  rank: number | null;
  minOrderValue: string;
  companyWallets: CompanyWalletResType[];
};

type TokenPairType = {
  id: number;
  pairName: string;
  firstToken: {
    id: number;
  };
  secondToken: {
    id: number;
  };
};

export type GetFullTokenInfoRes = {
  tokenInfo: TokenType;
  tokenPair: TokenPairType;
  defaultTokenId: number;
};
