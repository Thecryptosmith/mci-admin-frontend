export type NetworkTokensInfo = { id: number; yield: number | null };

export type NetworkWithTokens = {
  id: string;
  data: {
    id: number;
    tokensInfo: NetworkTokensInfo[] | null;
    yield?: number | string | null;
  };
};

export type NetworkWithTokensPayload = {
  id: number;
  tokensInfo: NetworkTokensInfo[];
};
