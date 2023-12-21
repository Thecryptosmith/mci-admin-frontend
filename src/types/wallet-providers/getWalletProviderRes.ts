import { WalletProviderCategoryEnum } from "@src/common/emuns/WalletProviderCategoryEnum";
import { NetworkWithTokens } from "@src/types/wallet-providers/network-with-tokens";

type WalletProviderTokenInfo = {
  id: number;
  yield: string;
};

type WalletProviderLogo = {
  id: number;
  key: string;
};

export type GetWalletProviderRes = {
  id: number;
  name: string;
  description: string;
  url: string;
  about: string;
  overallRanking: number;
  rating: string;
  category: WalletProviderCategoryEnum;
  tokensInfo: WalletProviderTokenInfo[];
  networks: NetworkWithTokens[];
  logo: WalletProviderLogo;
};
