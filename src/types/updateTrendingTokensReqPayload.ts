type TrendingToken = {
  rank: number;
  tokenInfo: {
    id: number;
  } | null;
};

export type UpdateTrendingTokensReqPayload = {
  trending: TrendingToken[];
};
