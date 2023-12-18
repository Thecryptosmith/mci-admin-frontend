type WalletProvider = {
  id: number;
  name: string;
  description: string;
  url: string;
  about: string;
  overallRanking: number;
  rating: string;
  category: string;
  logo: {
    id: number;
    key: string;
  };
};

export type GetAllWalletProvidersRes = {
  walletProviders: WalletProvider[];

  count: number;
};
