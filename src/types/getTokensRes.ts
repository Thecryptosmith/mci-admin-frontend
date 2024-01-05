export type TokenData = {
  id: number;
  name: string;
  slug: string;
  logo?: string;
  symbol?: string;
  price?: number;
  percentChange24h?: number;
  volume24h?: number;
  marketCap?: number;
  rank?: number;
  yield?: string | number | null;
  amount?: number;
};

export type GetTokensRes = {
  tokens: TokenData[];
  count: number;
};
