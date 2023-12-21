export type NetworkTokensInfo = {
  id: number;
  yield: number | string | null;
  name?: string;
  slug?: string;
};

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
  yield?: string | number | null;
};
