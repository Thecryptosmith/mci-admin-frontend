import { WalletProviderCategoryEnum } from "@src/common/emuns/WalletProviderCategoryEnum";
import { NetworkWithTokensPayload } from "@src/types/wallet-providers/network-with-tokens";

export type UpdateWalletProviderReqPayload = {
  id: number;
  name: string;
  description: string;
  url: string;
  about: string;
  overallRanking: number;
  rating: number;
  category: WalletProviderCategoryEnum;
  file: number;
  networks: NetworkWithTokensPayload[];
};
