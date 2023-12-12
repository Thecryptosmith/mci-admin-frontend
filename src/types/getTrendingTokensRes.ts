type Trending = {
  id: number;
  rank: number;
  tokenInfo: {
    id: number;
    coinMarketId: number;
    logo: string;
    name: string;
    symbol: string;
    slug: string;
  };
};

type TrendingTokens = Record<string, Trending>;

export type GetTrendingTokensRes = {
  trending: TrendingTokens;
};
