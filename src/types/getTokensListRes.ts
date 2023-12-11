export type NetworkType = {
  id: number;
  name: string;
  symbol: string;
  logo: string;
};

export type TokenInfo = {
  id: number;
  logo: string;
  name: string;
  symbol: string;
  krakenAssetName: string;
  networks: NetworkType[];
};

export type GetTokensListRes = {
  tokens: TokenInfo[];

  count: number;
};
