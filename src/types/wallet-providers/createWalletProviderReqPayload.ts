import { WalletProviderCategoryEnum } from "@src/common/emuns/WalletProviderCategoryEnum";
import { NetworkWithTokensPayload } from "@src/types/wallet-providers/network-with-tokens";

export type CreateWalletProviderReqPayload = {
  name: string;
  description: string;
  url: string;
  about: string;
  overallRanking: number;
  rating: number;
  category: WalletProviderCategoryEnum;
  file: any;
  networks: NetworkWithTokensPayload[];
};
