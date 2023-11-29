export type TokenData = {
  id: number;
  slug: string;
  logo?: string;
  name: string;
  symbol?: string;
  price?: number;
  percentChange24h?: number;
  volume24h?: number;
  marketCap?: number;
  rank?: number;
};

export type GetTokensRes = {
  tokens: TokenData[];
  count: number;
};
