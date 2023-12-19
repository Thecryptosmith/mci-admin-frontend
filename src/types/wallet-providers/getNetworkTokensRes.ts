type Token = {
  id: number;
  name: string;
  symbol: string;
  logo: string;
  slug: string;
};

export type GetNetworkTokensRes = {
  id: number;
  tokensInfo: Token[];
};
