export type Platform = {
  id: string;
  name: string;
  slug: string;
  symbol: string;
  token_address: string;
};

export type CoinMarketTokenInfo = {
  id: number;
  name: string;
  symbol: string;
  category: string;
  description: string;
  slug: string;
  logo: string;
  platform: Platform | null;
  date_added: string;
  date_launched: string | null;
};
